import type { NestedKeyOf } from './types'
import { Effect } from 'effect'
import { addBitVectors, bitwiseAND, bitwiseNOT, bitwiseOR, bitwiseShiftLeft, bitwiseXOR, countSetBits, maskVP, normalizeText, setLeastSignificantBit } from './utils'

export class QuantumMatcher<T> {
  private collection: T[]
  private pathCache = new Map<string, string[]>()

  constructor(
    collection: T[],
    private options: {
      keys?: Array<NestedKeyOf<T>> | Array<keyof T>
    },
  ) {
    this.collection = collection
  }

  public findMatches(query: string): { item: T, score: number, matches: [number, number][] }[] {
    return Effect.try({
      try: () => {
        const queryParts = query.split(' ').map(normalizeText)
        const results: { item: T, score: number, matches: [number, number][] }[] = []

        for (const item of this.collection) {
          let totalScore = 0
          let allMatches: [number, number][] = []

          for (const queryPart of queryParts) {
            let bestScoreForPart = 0
            let bestMatchesForPart: [number, number][] = []

            for (const key of this.options.keys || []) {
              const text = String(this.getNestedValue(item, key as any))
              const normalizedText = normalizeText(text)
              const queryMask = this.createCharMask(queryPart)
              const m = queryPart.length
              const n = normalizedText.length

              let VP = this.createInitialVP(m)
              let HN: number[] = []
              let HP: number[] = []
              let score = 0
              let matches: [number, number][] = []

              for (let j = 0; j < n; j++) {
                const char = normalizedText[j]
                const EQ = queryMask.get(char) || []

                const X = bitwiseOR(EQ, HP)
                const X_and_VP = bitwiseAND(X, VP)
                const sum = addBitVectors(VP, X_and_VP)
                const sum_xor_VP = bitwiseXOR(sum, VP)
                const D0 = bitwiseOR(sum_xor_VP, X)

                const HN_new = bitwiseAND(VP, D0)
                const D0_or_HN = bitwiseOR(D0, HN_new)
                const HP_new = bitwiseOR(VP, bitwiseNOT(D0_or_HN))

                HP = setLeastSignificantBit(bitwiseShiftLeft(HP_new))
                HN = bitwiseShiftLeft(HN_new)

                VP = maskVP(bitwiseOR(HP, bitwiseNOT(bitwiseOR(D0, HN))), m)

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

          if (totalScore / queryParts.length > 0.5) {
            results.push({ item, score: totalScore / queryParts.length, matches: allMatches })
          }
        }

        return results.sort((a, b) => b.score - a.score).filter(v => v.score === 1)
      },
      catch: error => new Error(`[findMatches]: Failed to find matches: ${error}`),
    }).pipe(Effect.runSync)
  }

  private getNestedValue(obj: any, path: string): any {
    if (path === '')
      return obj
    if (obj == null)
      return undefined

    let pathArray = this.pathCache.get(path)
    if (!pathArray) {
      pathArray = path.split('.')
      this.pathCache.set(path, pathArray)
    }

    let current = obj
    for (const part of pathArray) {
      if (current == null)
        return undefined
      current = current[part]
    }
    return current
  }

  private createCharMask(text: string): Map<string, number[]> {
    const maskMap = new Map<string, number[]>()
    const chunkCount = Math.ceil(text.length / 32)

    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      const chunkIndex = Math.floor(i / 32)
      const bitPosition = i % 32

      // eslint-disable-next-line unicorn/no-new-array
      let chunks = maskMap.get(char) || new Array(chunkCount).fill(0)
      if (chunks.length < chunkCount) {
        chunks = [...chunks, ...Array.from({ length: chunkCount - chunks.length }).fill(0)]
      }

      chunks[chunkIndex] |= 1 << bitPosition
      maskMap.set(char, chunks)
    }

    for (const [char, chunks] of maskMap) {
      if (chunks.length < chunkCount) {
        maskMap.set(char, [...chunks, ...Array.from<number>({ length: chunkCount - chunks.length }).fill(0)])
      }
    }

    return maskMap
  }

  private createInitialVP(m: number): number[] {
    const chunkCount = Math.ceil(m / 32)
    // eslint-disable-next-line unicorn/no-new-array
    const vp = new Array(chunkCount).fill(0)
    for (let i = 0; i < m; i++) {
      const chunkIndex = Math.floor(i / 32)
      const bitPosition = i % 32
      vp[chunkIndex] |= 1 << bitPosition
    }
    return vp
  }

  private calculateMatchQuality(
    VP: number[],
    m: number,
    currentIndex: number,
    normalizedText: string,
    query: string,
  ): number {
    const matchCount = countSetBits(VP)
    const matchRatio = matchCount / m
    const isContiguous = this.isContiguousMatch(VP, m)
    const alignmentPenalty = isContiguous ? 1 : 0.2
    const positionBonus = matchRatio > 0.5 ? (normalizedText.length - currentIndex) / normalizedText.length : 0
    const partialMatchBonus = normalizedText.includes(query) ? 1 : 0

    const score = (
      (matchRatio * 0.6)
      + (alignmentPenalty * 0.3)
      + (positionBonus * 0.05)
      + (partialMatchBonus * 0.05)
    )

    return Math.min(score, 1)
  }

  private isContiguousMatch(VP: number[], m: number): boolean {
    let first = -1
    let last = -1
    for (let i = 0; i < m; i++) {
      const chunkIndex = Math.floor(i / 32)
      const bitPosition = i % 32
      if (chunkIndex >= VP.length)
        break
      if ((VP[chunkIndex] & (1 << bitPosition)) !== 0) {
        if (first === -1)
          first = i
        last = i
      }
    }
    return (last - first + 1) === m && first !== -1
  }

  private findMatchRanges(VP: number[], m: number, endIndex: number): [number, number][] {
    const ranges: [number, number][] = []
    let start = -1
    let end = -1

    for (let i = 0; i < m; i++) {
      const chunkIndex = Math.floor(i / 32)
      const bitPosition = i % 32
      if (chunkIndex < VP.length && (VP[chunkIndex] & (1 << bitPosition)) !== 0) {
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
