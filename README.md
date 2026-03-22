# 🪐 Scale of the UniVRse

> **WE WIN TOGETHER · WE LOSE TOGETHER**

A cooperative educational VR companion app where one player explores the universe through a VR headset while their partner guides them from a tablet. Together, they discover the scale of everything — from quarks to the observable universe — and answer trivia questions as a team.

---

## 🎮 Concept

The universe has a scale. From the tiniest subatomic particles to galaxy clusters billions of light-years wide — Scale of the UniVRse lets you *feel* that scale through immersive VR exploration and cooperative gameplay.

- 🥽 **The Voyager** wears the VR headset and travels through scales of the universe
- 📱 **The Navigator** uses the tablet companion app to guide, compare objects, and answer trivia
- Both must trust each other — **same answer = maximum points, same wrong answer = game over**

---

## ✨ Features

### 🚀 Onboarding Flow
- Animated loading screen with orbiting planet
- Logo page with warp-speed star field
- Device connection simulation (VR headset pairing)
- Flip card mission briefing for both roles

### 🌌 Trivia Game
- **5 questions** per session — randomly generated each game
- Two question types:
  - **⚖️ Size Battle** — which of these two objects is larger?
  - **🔍 Guess the Element** — identify the object from a fun fact
- 20-second countdown timer per question
- Voyager's answer simulated in real time

### 🏆 Scoring System
| Result | Points |
|--------|--------|
| Both correct (same answer) | +2 |
| One correct (different answers) | +1 |
| Both wrong (different answers) | -1 |
| Both wrong (same answer) | 💥 GAME OVER |

### 🗺️ Scale Explorer (coming soon)
- Browse 11 scale levels from quarks (`10⁻¹⁵ m`) to the observable universe (`10²⁶ m`)
- Tap objects for fun facts and detailed info cards
- Side-by-side size comparison with visual bars

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Styling | Tailwind CSS + Custom CSS |
| Typography | Orbitron (Google Fonts) |
| Realtime sync | Firebase Realtime Database |
| Hosting | Vercel (planned) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── LoadingScreen.jsx   # Animated planet loading screen
│   ├── LogoPage.jsx        # Start screen with SVG logo
│   ├── ConnectPage.jsx     # VR headset pairing simulation
│   ├── RulesPage.jsx       # Flip card mission briefing
│   ├── WarpPage.jsx        # Warp speed transition
│   ├── TriviaPage.jsx      # Kahoot-style trivia game
│   └── ResultPage.jsx      # Final score screen
├── data/
│   ├── scaleData.js        # 11 scale levels + objects
│   └── triviaData.js       # Question generator from CSV data
├── App.jsx                 # Main app + page routing
├── index.css               # Global styles + animations
└── trivia.css              # Trivia-specific styles
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS version) — [nodejs.org](https://nodejs.org)
- A Firebase account — [firebase.google.com](https://firebase.google.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/Garaii/Scale-of-uniVRse.git
cd Scale-of-uniVRse

# Install dependencies
npm install

# Start the dev server
npm run dev
```

### Firebase Setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Realtime Database** in test mode
3. Register a web app and copy your config
4. Create `src/firebase.js`:

```js
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
```

> ⚠️ Never commit your real Firebase config to a public repo. Use environment variables in production.

---

## 🎭 The Roles

### 🥽 Voyager
You explore the universe in VR. Objects appear around you at different scales. Answer trivia questions you see in the headset — and trust your Navigator!

### 📱 Navigator
You guide from the tablet. You see the same questions, compare object sizes, and read fun facts. Communicate with your Voyager — you must agree on the same answer!

---

## 🗺️ Scale Journey

| Level | Scale | Examples |
|-------|-------|---------|
| Quantum Realm | `10⁻¹⁵ m` | Proton, Neutron |
| Atomic Scale | `10⁻¹⁰ m` | Hydrogen Atom, DNA |
| Microbial World | `10⁻⁶ m` | Bacteria, Red Blood Cell |
| Insect Scale | `10⁻³ m` | Ant, Grain of Sand |
| Human Scale | `10⁰ m` | Human, Burj Khalifa, Kilimanjaro |
| City Scale | `10³ m` | Central Park, Golden Gate Bridge |
| Country Scale | `10⁶ m` | France, Amazon River |
| Planet Scale | `10⁷ m` | Earth, The Moon |
| Solar System | `10¹¹ m` | The Sun, Jupiter |
| Galaxy Scale | `10²¹ m` | Milky Way, Andromeda |
| Observable Universe | `10²⁶ m` | The Universe, Cosmic Web |

---

## 🔮 Roadmap

- [ ] Real Firebase sync between VR headset and tablet
- [ ] Full scale explorer with object browsing
- [ ] More trivia questions from the full CSV dataset (290+ objects)
- [ ] Animated scale transitions between levels
- [ ] Multiplayer leaderboard
- [ ] Deploy to Vercel

---

## 👥 Team

Built in 36 hours as an educational VR companion experience.


