/* eslint-disable antfu/no-import-dist */
import { describe, expect, it } from 'vitest'
import { QuantumMatcher } from '../../dist'
import { scientificData } from '../const'

describe('quantumMatcher Depth Search with Scientific Data', () => {
  const matcher = new QuantumMatcher(scientificData, {
    keys: [
      'id',
      'title',
      'content.basics.description',
      'content.basics.examples',
      'content.advanced.applications.realWorld',
      'content.advanced.applications.economics',
      'content.metadata.category.main',
      'content.metadata.category.sub',
      'content.metadata.tags',
      'content.basics.formula.standard',
      'content.basics.formula.vertex',
      'content.solutions.methods.factoring.steps',
      'content.solutions.methods.factoring.example',
      'content.solutions.methods.quadraticFormula.expression',
      'content.solutions.methods.quadraticFormula.usage',
      'content.fundamentals.laws.first.statement',
      'content.fundamentals.laws.first.applications.space',
      'content.fundamentals.laws.first.applications.earth',
      'content.fundamentals.laws.second.statement',
      'content.fundamentals.laws.second.components.force',
      'content.fundamentals.laws.second.components.mass',
      'content.fundamentals.laws.second.components.acceleration',
      'content.fundamentals.laws.third.statement',
      'content.fundamentals.laws.third.examples.rocket',
      'content.fundamentals.laws.third.examples.walking',
      'content.principles.uncertainty.definition.basic',
      'content.principles.uncertainty.definition.mathematical',
      'content.principles.uncertainty.implications.measurement.effects',
      'content.principles.uncertainty.implications.measurement.limitations',
      'content.principles.waveFunctions.properties.superposition.description',
      'content.principles.waveFunctions.properties.superposition.examples.cat',
      'content.principles.waveFunctions.properties.superposition.examples.electron',
      'content.metadata.category.level',
      'content.metadata.tags',
    ],
  })

  // Existing tests
  it('should find exact matches', () => {
    const results = matcher.findMatches('Linear Equations')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Linear Equations')
  })

  it('should handle case insensitivity', () => {
    const results = matcher.findMatches('linear equations')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Linear Equations')
  })

  it('should find partial matches', () => {
    const results = matcher.findMatches('equations')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(result => result.item.title.includes('Equations'))).toBe(true)
  })

  it('should handle special characters', () => {
    const results = matcher.findMatches('F = ma')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(result => result.item.title === 'Newton\'s Laws')).toBe(true)
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
    const results = matcher.findMatches('Cannot simultaneously know position')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quantum Mechanics')
  })

  it('should find matches by tags', () => {
    const results = matcher.findMatches('algebra')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(result => result.item.content.metadata.tags.includes('algebra'))).toBe(true)
  })

  it('should handle multiple keywords', () => {
    const results = matcher.findMatches('Quantum Uncertainty')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quantum Mechanics')
  })

  it('should handle numeric searches', () => {
    const results = matcher.findMatches('ΔxΔp ≥ ħ/2')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quantum Mechanics')
  })

  it('should find matches in basics.description', () => {
    const results = matcher.findMatches('Equations where variables are raised to the first power')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Linear Equations')
  })

  it('should find matches in basics.examples', () => {
    const results = matcher.findMatches('y = mx + b')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Linear Equations')
  })

  it('should find matches in advanced.applications.realWorld', () => {
    const results = matcher.findMatches('Used in calculating slopes and linear relationships')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Linear Equations')
  })

  it('should find matches in advanced.applications.economics', () => {
    const results = matcher.findMatches('Supply and demand curves')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Linear Equations')
  })

  it('should find matches in metadata.category.main', () => {
    const results = matcher.findMatches('mathematics')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(result => result.item.content.metadata.category.main === 'mathematics')).toBe(true)
  })

  it('should find matches in metadata.category.sub', () => {
    const results = matcher.findMatches('algebra')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(result => result.item.content.metadata.category.sub === 'algebra')).toBe(true)
  })

  // New tests for missing keys
  it('should find matches in basics.formula.standard', () => {
    const results = matcher.findMatches('ax² + bx + c = 0')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quadratic Equations')
  })

  it('should find matches in basics.formula.vertex', () => {
    const results = matcher.findMatches('y = a(x - h)² + k')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quadratic Equations')
  })

  it('should find matches in solutions.methods.factoring.steps', () => {
    const results = matcher.findMatches('Find factors')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quadratic Equations')
  })

  it('should find matches in solutions.methods.factoring.example', () => {
    const results = matcher.findMatches('x² + 5x + 6 = (x + 2)(x + 3)')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quadratic Equations')
  })

  it('should find matches in solutions.methods.quadraticFormula.expression', () => {
    const results = matcher.findMatches('x = (-b ± √(b² - 4ac)) / 2a')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quadratic Equations')
  })

  it('should find matches in solutions.methods.quadraticFormula.usage', () => {
    const results = matcher.findMatches('When factoring is not possible')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quadratic Equations')
  })

  it('should find matches in fundamentals.laws.first.statement', () => {
    const results = matcher.findMatches('An object remains at rest or in motion unless acted upon by a force')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Newton\'s Laws')
  })

  it('should find matches in fundamentals.laws.first.applications.space', () => {
    const results = matcher.findMatches('Objects in space continue moving without propulsion')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Newton\'s Laws')
  })

  it('should find matches in fundamentals.laws.first.applications.earth', () => {
    const results = matcher.findMatches('Friction affects motion on Earth')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Newton\'s Laws')
  })

  it('should find matches in fundamentals.laws.second.statement', () => {
    const results = matcher.findMatches('F = ma')
    expect(results.length).toBeGreaterThan(0)
  })

  it('should find matches when searching by multiple properties "Newton\'s Laws F = ma"', () => {
    const results = matcher.findMatches('Newton\'s Laws F = ma')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Newton\'s Laws')
  })

  it('should find matches in fundamentals.laws.second.components.force', () => {
    const results = matcher.findMatches('Measured in Newtons')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Newton\'s Laws')
  })

  it('should find matches in fundamentals.laws.second.components.mass', () => {
    const results = matcher.findMatches('Measured in kilograms')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Newton\'s Laws')
  })

  it('should find matches in fundamentals.laws.second.components.acceleration', () => {
    const results = matcher.findMatches('Measured in meters per second squared')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Newton\'s Laws')
  })

  it('should find matches in fundamentals.laws.third.statement', () => {
    const results = matcher.findMatches('For every action, there is an equal and opposite reaction')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Newton\'s Laws')
  })

  it('should find matches in fundamentals.laws.third.examples.rocket', () => {
    const results = matcher.findMatches('Propulsion in space')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Newton\'s Laws')
  })

  it('should find matches in fundamentals.laws.third.examples.walking', () => {
    const results = matcher.findMatches('Push against ground')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Newton\'s Laws')
  })

  it('should find matches in principles.uncertainty.definition.basic', () => {
    const results = matcher.findMatches('Cannot simultaneously know position and momentum precisely')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quantum Mechanics')
  })

  it('should find matches in principles.uncertainty.definition.mathematical', () => {
    const results = matcher.findMatches('ΔxΔp ≥ ħ/2')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quantum Mechanics')
  })

  it('should find matches in principles.uncertainty.implications.measurement.effects', () => {
    const results = matcher.findMatches('Act of measurement affects the system')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quantum Mechanics')
  })

  it('should find matches in principles.uncertainty.implications.measurement.limitations', () => {
    const results = matcher.findMatches('Fundamental limits to precision')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quantum Mechanics')
  })

  it('should find matches in principles.waveFunctions.properties.superposition.description', () => {
    const results = matcher.findMatches('System can exist in multiple states simultaneously')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quantum Mechanics')
  })

  it('should find matches in principles.waveFunctions.properties.superposition.examples.cat', () => {
    const results = matcher.findMatches('Schrödinger\'s cat thought experiment')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quantum Mechanics')
  })

  it('should find matches in principles.waveFunctions.properties.superposition.examples.electron', () => {
    const results = matcher.findMatches('Electron passing through double slit')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quantum Mechanics')
  })

  it('should find matches in metadata.category.level', () => {
    const results = matcher.findMatches('intermediate')
    expect(results.length).toBe(1)
    expect(results[0].item.title).toBe('Quadratic Equations')
  })
})
