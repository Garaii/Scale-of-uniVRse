import { ref, set, onValue, off, remove, update } from "firebase/database"
import { db } from "../firebase"

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

function generateCode() {
  return Array.from({ length: 4 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join("")
}

export async function createSession() {
  const code = generateCode()
  await set(ref(db, `sessions/${code}`), {
    status: "waiting",
    score: 0,
    round: 0,
    question: null,
    voyagerAnswer: null,
    navigatorAnswer: null,
    result: null,
  })
  return code
}

export function watchSession(code, callback) {
  const r = ref(db, `sessions/${code}`)
  onValue(r, (snap) => callback(snap.val()))
  return () => off(r)
}

export async function writeNavigatorAnswer(code, answer) {
  await update(ref(db, `sessions/${code}`), { navigatorAnswer: answer })
}

export async function cleanupSession(code) {
  await remove(ref(db, `sessions/${code}`))
}
