const elements = [
  { name: "Ant", size_m: 0.004, description: "15-25% of all land animals are ants! For every person on Earth, there are over one million of these!", category: "Biology" },
  { name: "Basketball", size_m: 0.24, description: "This object, which is very round, is often pushed through a hoop.", category: "Everyday Objects" },
  { name: "Betelgeuse", size_m: 1.1e12, description: "IT can live for trillions of years, it is so big that it will only live for just over 8 million years. When it explodes, the supernova will be visible during the day.", category: "Stars" },
  { name: "DNA Strand", size_m: 2.5e-9, description: "If this element located in one human cell were uncoiled and stretched out, it would be about 2 meters long — yet it fits inside a cell nucleus.", category: "Chemistry" },
  { name: "Andromeda Galaxy", size_m: 1.4e21, description: "It is the Milky Way's twin. In a few billion years, the two galaxies will collide and form one larger elliptical galaxy - Milkomeda.", category: "Galaxies" },
  { name: "Amoeba", size_m: 0.00035, description: "They are unicellular, which means there is only one cell. Some can grow to an incredible 700 micrometers, which is almost an entire millimeter.", category: "Microbiology" }, /*************************************** */
  { name: "Angel Falls", size_m: 980, description: "Angel Falls is the tallest waterfall in the world. It is Venezuela's top tourist attraction. Most of the water evaporates into mist before hitting the ground.", category: "Geography" },
  { name: "Uranus", size_m: 51000000, description: "A lot of people like to think 'Uranus' sounds like 'your anus'. There are many other, and better, pronunciations.", category: "Solar System" },
  { name: "Water Molecule", size_m: 2.8e-10, description: "I like to think that whenever I drink water, I drink Mickey Mouse heads. Do you, too?", category: "Chemistry" },
  { name: "White Blood Cell", size_m: 0.00001, description: "These mass murderers are also known as leukocytes. The most common type, the neutrophil, has multiple nuclei.", category: "Microbiology" },
  { name: "Washington Monument", size_m: 169, description: "The Washington Monument is the world's tallest obelisk, as well as the world's tallest stone structure. It was the world's tallest structure from 1884 to 1889.", category: "Human Structures" },
  { name: "Aldebaran", size_m: 63000000000, description: "Aldebaran is not to be confused with Alderaan, which is a planet in Star Wars. Aldebaran is 4,900 times larger than Earth, rotates every 520 Earth days, and has no water.", category: "Stars" },
  { name: "Vatican City", size_m: 800, description: "Vatican City is the smallest country. If you were to stretch your flesh over Vatican City so that it was spread evenly, the coating would be about 200 nanometers thick.", category: "Geography" },
  { name: "Width of Human Hair", size_m: 0.0001, description: "Human hair is amazing. Straight hair is almost perfectly cylindrical. Did you know that you probably have 50,000 to 200,000 strands of hair on your head?", category: "Biology" },
  { name: "VY Canis Majoris", size_m: 2e12, description: "VY Canis Majoris is one of the largest known stars. It would take a plane 800 years to circle it once.", category: "Stars" },
  { name: "Bacteriophage", size_m: 2e-7, description: "The bacteriophage, or just 'phage' for short, is a type of bacteria-infecting virus. It could be argued that viruses are not alive at all.", category: "Microbiology" },
  { name: "Wandering Albatross", size_m: 2.3, description: "The Wandering Albatross is the bird with the largest wingspan! They fly almost all the time, only stopping to eat and make babies.", category: "Biology" },
  { name: "Venus", size_m: 12000000, description: "Venus's surface temperature is always above 450°C, because its atmosphere, which is mostly carbon dioxide, traps the Sun's heat!", category: "Solar System" },
  { name: "Up Quark", size_m: 1e-20, description: "There are six flavors of quarks: up, down, strange, charm, top, and bottom. The smaller a quark is, the more mass it has.", category: "Subatomic Physics" },
  { name: "Asia", size_m: 8000000, description: "Asia is the Earth's largest continent, holding over four billion people — over half of the world's population.", category: "Geography" },
]

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function formatSize(m) {
  if (m >= 9.46e15) return `${(m / 9.46e15).toFixed(1)} light-years`
  if (m >= 1e12) return `${(m / 1e12).toFixed(1)} trillion m`
  if (m >= 1e9) return `${(m / 1e9).toFixed(1)} billion m`
  if (m >= 1e6) return `${(m / 1e6).toFixed(2)} million m`
  if (m >= 1e3) return `${(m / 1e3).toFixed(2)} km`
  if (m >= 1) return `${m.toFixed(2)} m`
  if (m >= 1e-3) return `${(m * 1e3).toFixed(2)} mm`
  if (m >= 1e-6) return `${(m * 1e6).toFixed(2)} µm`
  if (m >= 1e-9) return `${(m * 1e9).toFixed(2)} nm`
  return `${(m * 1e20).toFixed(2)} × 10⁻²⁰ m`
}

function generateComparisonQuestion(pool) {
  const [a, b] = shuffle(pool).slice(0, 2)
  const larger = a.size_m >= b.size_m ? a : b
  return {
    type: "comparison",
    question: `Which is LARGER?`,
    hint: `The Voyager may be able to spot both of these in their world!`,
    options: shuffle([a.name, b.name]),
    correct: larger.name,
    elemA: a,
    elemB: b,
  }
}

function generateGuessQuestion(pool) {
  const target = shuffle(pool)[0]
  const distractors = shuffle(pool.filter(e => e.name !== target.name)).slice(0, 3)
  const options = shuffle([target, ...distractors]).map(e => e.name)
  return {
    type: "guess",
    question: `Which element does this describe?`,
    hint: target.description,
    category: target.category,
    options,
    correct: target.name,
    target,
  }
}

export function generateQuestions() {
  const pool = shuffle(elements)
  return [
    generateGuessQuestion(pool.slice(0, 5)),
    generateComparisonQuestion(pool.slice(0, 6)),
    generateGuessQuestion(pool.slice(5, 10)),
    generateComparisonQuestion(pool.slice(4, 10)),
    generateGuessQuestion(pool.slice(10, 15)),
  ]
}

export { formatSize }