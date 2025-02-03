# QuantumMatcher Library

`QuantumMatcher` library is a fuzzy matching algorithm that leverages bitwise operations to efficiently find approximate matches within a collection of items.

Project in progress ...

## Prerequisites

- [x] `Node.js >= 18.x`
- [x] `Yarn >= 1.x`

## Features

- **Fuzzy Matching**: Efficiently finds approximate matches in a collection.
- **Customizable Keys**: Specify which keys of the items to match against.
- **Match Quality Calculation**: Considers match ratio, contiguity, position, and partial matches.
- **Sorted Results**: Returns results sorted by match score.

## Algorithm Explanation

The `QuantumMatcher` class uses a bitwise algorithm to perform fuzzy matching. Here's a breakdown of the process:

1. **Normalization**:

   - The query string is split into parts and normalized using the `normalizeText` function to standardize the text for comparison.

2. **Character Mask Creation**:

   - A character mask is created for each query part using the `createCharMask` method. This mask maps each character to a bitmask representing its positions in the string.

3. **Bitwise Matching**:

   - Bitwise operations are used to calculate matches. Bit vectors `VP`, `HN`, and `HP` track matches and mismatches.
   - For each character in the normalized text, the algorithm updates the bit vectors based on the character mask.

4. **Score Calculation**:

   - The `calculateMatchQuality` method computes match quality using:
     - **Match Ratio**: Ratio of matched characters to query length.
     - **Contiguity**: Checks if matches are contiguous.
     - **Position Bonus**: Rewards matches closer to the start of the text.
     - **Partial Match Bonus**: Rewards partial matches if the query is found in the text.

5. **Result Filtering and Sorting**:
   - Results with a significant score (average score > 0.5 per query part) are included.
   - Results are sorted by score in descending order and filtered to include only perfect matches (score of 1).

## Installation (NOTE: Not yet available)

Ensure TypeScript is installed in your project. You can install it using npm:

```shell
npm install quantummatcher
# or
yarn add quantummatcher
```

# 📚 Documentation

```shell
npm run start
# or
yarn start
```

## Example Usage

`constructor(collection: T[], private options: { keys?: (keyof T)[] })`
The QuantumMatcher class constructor takes two parameters:

1. Collection : An array of items to search through. Each item should be an object with properties that can be matched against.
2. Options : An object specifying the keys to match against. The keys property is an array of strings representing the keys in the items that should be considered for matching.

```typescript
import { QuantumMatcher } from 'quantummatcher'

// Define a collection of items
const options = [
  {
    id: 1,
    title: 'Pythagorean Theorem',
    description:
      'In mathematics, the Pythagorean theorem states that in a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.',
    tags: ['math', 'geometry', 'theorem'],
  },
  // ... more items ...
]

// Create an instance of QuantumMatcher
const matcher = new QuantumMatcher(options, {
  keys: ['title', 'description', 'tags'],
})

// Find matches for a query
const output = matcher.findMatches('numbers')
console.log(output)
```

## output:

```json
[
  {
    "item": {
      "id": 5,
      "title": "Random String Example",
      "description": "This is a random string that can be used for testing search functionality. It includes special characters like @#$%^&* and numbers like 12345.",
      "tags": []
    },
    "score": 1,
    "matches": [[]]
  },
  {
    "item": {
      "id": 7,
      "title": "Fibonacci Sequence",
      "description": "The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, starting from 0 and 1.",
      "tags": []
    },
    "score": 1,
    "matches": [[]]
  },
  {
    "item": {
      "id": 9,
      "title": "Another Random String",
      "description": "This is another random string for testing purposes. It includes mixed case letters, numbers 67890, and symbols !@#$%^&*().",
      "tags": []
    },
    "score": 1,
    "matches": [[]]
  }
]
```

...

## **:handshake: Contributing**

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

---

### **:busts_in_silhouette: Credits**

- [Chris Michael](https://github.com/chrismichaelps) (Project Leader, and Developer)

---

### **:anger: Troubleshootings**

This is just a personal project created for study / demonstration purpose and to simplify my working life, it may or may
not be a good fit for your project(s).

---

### **:heart: Show your support**

Please :star: this repository if you like it or this project helped you!\
Feel free to open issues or submit pull-requests to help me improving my work.

<a href="https://www.buymeacoffee.com/chrismichael" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

---

### **:robot: Author**

_*Chris M. Perez*_

> You can follow me on
> [github](https://github.com/chrismichaelps)&nbsp;&middot;&nbsp;[twitter](https://twitter.com/Chris5855M)

---

Copyright ©2025 [QuantumMatcher](https://github.com/chrismichaelps/quantummatcher).
