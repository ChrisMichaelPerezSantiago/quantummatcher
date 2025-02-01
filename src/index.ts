import { normalizeText } from './utils'

export class QuantumMatcher<T> {
  private collection: T[]

  constructor(collection: T[], private options: { keys?: (keyof T)[] }) {
    this.collection = collection
  }

  public findMatches(query: string): { item: T, score: number, matches: [number, number][] }[] {
    const queryParts = query.split(' ').map(normalizeText) // Split and normalize query parts
    const results: { item: T, score: number, matches: [number, number][] }[] = []

    for (const item of this.collection) {
      let totalScore = 0
      let allMatches: [number, number][] = []

      for (const queryPart of queryParts) {
        let bestScoreForPart = 0
        let bestMatchesForPart: [number, number][] = []

        for (const key of this.options.keys || []) {
          const text = String(item[key])
          const normalizedText = normalizeText(text)
          const queryMask = this.createCharMask(queryPart)
          const m = queryPart.length
          const n = normalizedText.length

          let VP = (1n << BigInt(m)) - 1n
          let HN = 0n
          let HP = 0n
          let score = 0
          let matches: [number, number][] = []

          for (let j = 0; j < n; j++) {
            const char = normalizedText[j]
            const EQ = queryMask.get(char) || 0n

            const X = EQ | HP
            const D0 = ((VP + (X & VP)) ^ VP) | X
            HN = VP & D0
            HP = VP | ~(D0 | HN)

            HP = (HP << 1n) | 1n
            HN <<= 1n

            VP = HP | ~(D0 | HN)
            VP &= (1n << BigInt(m)) - 1n

            const currentScore = this.calculateMatchQuality(VP, m, j, normalizedText, queryPart)
            if (currentScore > score) {
              score = currentScore
              matches = this.findMatchRanges(VP, m, j)
            }
          }

          if (score > bestScoreForPart) {
            bestScoreForPart = score
            bestMatchesForPart = matches
          }
        }

        totalScore += bestScoreForPart
        allMatches = allMatches.concat(bestMatchesForPart)
      }

      // Only add results with a significant total score
      if (totalScore / queryParts.length > 0.5) {
        results.push({ item, score: totalScore / queryParts.length, matches: allMatches })
      }
    }

    return results.sort((a, b) => b.score - a.score).filter(v => v.score === 1)
  }

  private createCharMask(text: string): Map<string, bigint> {
    const maskMap = new Map<string, bigint>()
    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      maskMap.set(char, (maskMap.get(char) || 0n) | (1n << BigInt(i)))
    }
    return maskMap
  }

  private calculateMatchQuality(
    VP: bigint,
    m: number,
    currentIndex: number,
    normalizedText: string,
    query: string,
  ): number {
    // Count the number of set bits (matches) in VP
    let matchCount = 0
    let mask = VP

    while (mask !== 0n) {
      if ((mask & 1n) === 1n) {
        matchCount++
      }
      mask >>= 1n
    }

    // Calculate the match ratio (matches / query length)
    const matchRatio = matchCount / m

    // Penalize matches that are not contiguous or not aligned properly
    const isContiguous = this.isContiguousMatch(VP, m)
    const alignmentPenalty = isContiguous ? 1 : 0.2 // Reduce score for non-contiguous matches

    // Calculate position bonus (matches at the start of the text score higher)
    const positionBonus = matchRatio > 0.5 ? (normalizedText.length - currentIndex) / normalizedText.length : 0

    // Calculate partial match bonus (reward partial matches)
    const partialMatchBonus = normalizedText.includes(query) ? 1 : 0

    // Combine factors to calculate score
    const score = (
      (matchRatio * 0.6) // 60% weight
      + (alignmentPenalty * 0.3) // 30% weight
      + (positionBonus * 0.05) // 5% weight
      + (partialMatchBonus * 0.05) // 5% weight
    )

    return Math.min(score, 1) // Ensure score does not exceed 1
  }

  private isContiguousMatch(VP: bigint, m: number): boolean {
    let first = -1
    let last = -1
    for (let i = 0; i < m; i++) {
      if ((VP & (1n << BigInt(i))) !== 0n) {
        if (first === -1)
          first = i
        last = i
      }
    }
    return (last - first + 1) === m
  }

  private findMatchRanges(VP: bigint, m: number, endIndex: number): [number, number][] {
    const ranges: [number, number][] = []
    let start = -1
    let end = -1

    for (let i = 0; i < m; i++) {
      if ((VP & (1n << BigInt(i))) !== 0n) {
        if (start === -1)
          start = endIndex - i
        end = endIndex - i
      }
      else if (start !== -1) {
        ranges.push([start, end])
        start = -1
        end = -1
      }
    }

    if (start !== -1) {
      ranges.push([start, end])
    }

    return ranges
  }
}
