import { describe, expect, it } from 'vitest'
import { QuantumMatcher } from '../../dist'

const options = [
  {
    id: 1,
    title: 'Pythagorean Theorem',
    description: 'In mathematics, the Pythagorean theorem states that in a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.',
    tags: ['math', 'geometry', 'theorem'],
  },
  {
    id: 2,
    title: 'Newton\'s Laws of Motion',
    description: 'Newton\'s laws of motion are three fundamental principles that describe the relationship between the motion of an object and the forces acting on it.',
    tags: ['science', 'physics', 'laws'],
  },
  {
    id: 3,
    title: 'Photosynthesis',
    description: 'Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll.',
    tags: ['science', 'biology', 'plants'],
  },
  {
    id: 4,
    title: 'Euler\'s Number',
    description: 'Euler\'s number (e) is an important mathematical constant approximately equal to 2.71828, and it is the base of the natural logarithm.',
    tags: ['math', 'constants', 'logarithms'],
  },
  {
    id: 5,
    title: 'Random String Example',
    description: 'This is a random string that can be used for testing search functionality. It includes special characters like @#$%^&* and numbers like 12345.',
    tags: ['random', 'string', 'test'],
  },
  {
    id: 6,
    title: 'Quantum Mechanics',
    description: 'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles.',
    tags: ['science', 'physics', 'quantum'],
  },
  {
    id: 7,
    title: 'Fibonacci Sequence',
    description: 'The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, starting from 0 and 1.',
    tags: ['math', 'sequence', 'numbers'],
  },
  {
    id: 8,
    title: 'Chemical Reactions',
    description: 'A chemical reaction is a process that leads to the transformation of one set of chemical substances to another.',
    tags: ['science', 'chemistry', 'reactions'],
  },
  {
    id: 9,
    title: 'Another Random String',
    description: 'This is another random string for testing purposes. It includes mixed case letters, numbers 67890, and symbols !@#$%^&*().',
    tags: ['random', 'string', 'test'],
  },
  {
    id: 10,
    title: 'Theory of Relativity',
    description: 'The theory of relativity, developed by Albert Einstein, consists of special relativity and general relativity, which revolutionized our understanding of space, time, and gravity.',
    tags: ['science', 'physics', 'relativity'],
  },
]

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
