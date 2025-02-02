/* eslint-disable antfu/no-import-dist */
/* eslint-disable no-console */
import { QuantumMatcher } from '../dist/index.mjs'
import { scientificData } from '../src/const'

// Add timing measurement
console.time('Search Performance')

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

const output = matcher.findMatches(
  'Newton\'s Laws F = ma',
)

console.timeEnd('Search Performance')

console.log('Search Results:', JSON.stringify(output, null, 2))
console.log('Number of matches found:', output.length)
