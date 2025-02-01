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
