/* eslint-disable antfu/no-import-dist */
/* eslint-disable no-console */
import { QuantumMatcher } from '../dist/index.mjs'
import { options } from '../src/const'

// Add timing measurement
console.time('Search Performance')

const matcher = new QuantumMatcher(options, { keys: ['title', 'description', 'tags'] })
const output = matcher.findMatches('science')

console.timeEnd('Search Performance')

console.log('Search Results:', output)
console.log('Number of matches found:', output.length)
