/* eslint-disable antfu/no-import-dist */
import { describe, expect, it } from 'vitest'
import { QuantumMatcher } from '../../dist'
import { options } from '../const'

describe('quantumMatcher', () => {
  const matcher = new QuantumMatcher(options, { keys: ['title', 'description', 'tags'] })

  it('should find exact matches', () => {
    const results = matcher.findMatches('Pythagorean Theorem')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Pythagorean Theorem')
  })

  it('should handle case insensitivity', () => {
    const results = matcher.findMatches('pythagorean theorem')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Pythagorean Theorem')
  })

  it('should find partial matches', () => {
    const results = matcher.findMatches('laws')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(result => result.item.title.includes('Laws'))).toBe(true)
  })

  it('should handle special characters', () => {
    const results = matcher.findMatches('@#$%^&*')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(result => result.item.description.includes('@#$%^&*'))).toBe(true)
  })
  it('should return empty for non-existent patterns', () => {
    const results = matcher.findMatches('xyz')
    expect(results.length).toBe(0)
  })
  it('should handle empty query', () => {
    const results = matcher.findMatches('')
    expect(results.length).toBe(0)
  })
  it('should handle long queries', () => {
    const longQuery = 'a'.repeat(1000)
    const results = matcher.findMatches(longQuery)
    expect(results.length).toBe(0)
  })
  it('should handle queries with spaces', () => {
    const results = matcher.findMatches('right-angled triangle')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(result => result.item.description.includes('right-angled triangle'))).toBe(true)
  })
  it('should find matches by tags', () => {
    const results = matcher.findMatches('physics')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(result => result.item.tags.includes('physics'))).toBe(true)
  })
  it('should handle multiple keywords', () => {
    const results = matcher.findMatches('Quantum Mechanics')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quantum Mechanics')
  })

  it('should handle numeric searches', () => {
    const results = matcher.findMatches('12345')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(result => result.item.description.includes('12345'))).toBe(true)
  })
})
