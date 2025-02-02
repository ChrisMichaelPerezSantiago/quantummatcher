export const options = [
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

export const scientificData = [
  {
    id: 'math-001',
    title: 'Linear Equations',
    content: {
      basics: {
        description: 'Equations where variables are raised to the first power',
        examples: ['y = mx + b', 'ax + by = c'],
      },
      advanced: {
        applications: {
          realWorld: 'Used in calculating slopes and linear relationships',
          economics: 'Supply and demand curves',
        },
      },
      metadata: {
        category: {
          main: 'mathematics',
          sub: 'algebra',
        },
        tags: ['algebra', 'equations', 'mathematics'],
      },
    },
  },
  {
    id: 'math-002',
    title: 'Quadratic Equations',
    content: {
      basics: {
        description: 'Equations involving variables raised to the second power',
        formula: {
          standard: 'ax² + bx + c = 0',
          vertex: 'y = a(x - h)² + k',
        },
      },
      solutions: {
        methods: {
          factoring: {
            steps: ['Find factors', 'Set to zero'],
            example: 'x² + 5x + 6 = (x + 2)(x + 3)',
          },
          quadraticFormula: {
            expression: 'x = (-b ± √(b² - 4ac)) / 2a',
            usage: 'When factoring is not possible',
          },
        },
      },
      metadata: {
        category: {
          main: 'mathematics',
          sub: 'algebra',
          level: 'intermediate',
        },
        tags: ['algebra', 'quadratic', 'polynomial'],
      },
    },
  },
  {
    id: 'phys-001',
    title: 'Newton\'s Laws',
    content: {
      fundamentals: {
        laws: {
          first: {
            statement: 'An object remains at rest or in motion unless acted upon by a force',
            applications: {
              space: 'Objects in space continue moving without propulsion',
              earth: 'Friction affects motion on Earth',
            },
          },
          second: {
            statement: 'F = ma',
            components: {
              force: 'Measured in Newtons',
              mass: 'Measured in kilograms',
              acceleration: 'Measured in meters per second squared',
            },
          },
          third: {
            statement: 'For every action, there is an equal and opposite reaction',
            examples: {
              rocket: 'Propulsion in space',
              walking: 'Push against ground',
            },
          },
        },
      },
      metadata: {
        category: {
          main: 'physics',
          sub: 'mechanics',
          level: 'fundamental',
        },
        tags: ['physics', 'mechanics', 'forces'],
      },
    },
  },
  {
    id: 'phys-002',
    title: 'Quantum Mechanics',
    content: {
      principles: {
        uncertainty: {
          definition: {
            basic: 'Cannot simultaneously know position and momentum precisely',
            mathematical: 'ΔxΔp ≥ ħ/2',
          },
          implications: {
            measurement: {
              effects: 'Act of measurement affects the system',
              limitations: 'Fundamental limits to precision',
            },
          },
        },
        waveFunctions: {
          properties: {
            superposition: {
              description: 'System can exist in multiple states simultaneously',
              examples: {
                cat: 'Schrödinger\'s cat thought experiment',
                electron: 'Electron passing through double slit',
              },
            },
          },
        },
      },
      metadata: {
        category: {
          main: 'physics',
          sub: 'quantum',
          level: 'advanced',
        },
        tags: ['quantum mechanics', 'physics', 'uncertainty'],
      },
    },
  },
]
