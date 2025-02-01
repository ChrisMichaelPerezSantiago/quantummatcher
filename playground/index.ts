import { QuantumMatcher } from '../dist/index.mjs'

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

const matcher = new QuantumMatcher(options, { keys: ['title', 'description', 'tags'] })
const output = matcher.findMatches('numbers')

console.log(output)
