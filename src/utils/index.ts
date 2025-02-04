import { Effect } from 'effect'

export function normalizeText(text: string): string {
  return Effect.try({
    try: () => {
      return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '')
        .replace(/\s/g, '')
    },
    catch: error => new Error(`[normalizeText]: Failed to normalize text: ${error}`),
  }).pipe(Effect.runSync)
}

export function bitwiseOR(a: number[], b: number[]): number[] {
  const result: number[] = []
  const maxLength = Math.max(a.length, b.length)
  for (let i = 0; i < maxLength; i++) {
    const aVal = i < a.length ? a[i] : 0
    const bVal = i < b.length ? b[i] : 0
    result.push(aVal | bVal)
  }
  return result
}

export function bitwiseAND(a: number[], b: number[]): number[] {
  const result: number[] = []
  const maxLength = Math.max(a.length, b.length)
  for (let i = 0; i < maxLength; i++) {
    const aVal = i < a.length ? a[i] : 0
    const bVal = i < b.length ? b[i] : 0
    result.push(aVal & bVal)
  }
  return result
}

export function bitwiseXOR(a: number[], b: number[]): number[] {
  const result: number[] = []
  const maxLength = Math.max(a.length, b.length)
  for (let i = 0; i < maxLength; i++) {
    const aVal = i < a.length ? a[i] : 0
    const bVal = i < b.length ? b[i] : 0
    result.push(aVal ^ bVal)
  }
  return result
}

export const bitwiseNOT = (a: number[]): number[] => a.map(chunk => (~chunk) >>> 0)

export function bitwiseShiftLeft(a: number[]): number[] {
  const result: number[] = []
  let carry = 0
  for (const chunk of a) {
    const newChunk = (chunk << 1) | carry
    carry = (chunk >>> 31) & 1
    result.push(newChunk >>> 0)
  }
  if (carry)
    result.push(carry)
  return result
}

export function addBitVectors(a: number[], b: number[]): number[] {
  const result: number[] = []
  let carry = 0
  const maxLength = Math.max(a.length, b.length)
  for (let i = 0; i < maxLength; i++) {
    const aVal = i < a.length ? a[i] : 0
    const bVal = i < b.length ? b[i] : 0
    const sum = aVal + bVal + carry
    carry = sum > 0xFFFFFFFF ? 1 : 0
    result.push(sum & 0xFFFFFFFF)
  }
  if (carry)
    result.push(carry)
  return result
}

export function setLeastSignificantBit(a: number[]): number[] {
  if (a.length === 0)
    return [1]
  const newA = [...a]
  newA[0] |= 1
  return newA
}

export function maskVP(vp: number[], m: number): number[] {
  const chunkCount = Math.ceil(m / 32)
  const masked = vp.slice(0, chunkCount)
  const lastChunkBits = m % 32 || 32
  if (masked.length > 0) {
    const lastIndex = masked.length - 1
    masked[lastIndex] &= (1 << lastChunkBits) - 1
  }
  return masked
}

export function countSetBits(vp: number[]): number {
  let count = 0
  for (const chunk of vp) {
    let c = chunk
    while (c) {
      count += c & 1
      c >>>= 1
    }
  }
  return count
}
