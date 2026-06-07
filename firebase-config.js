// ════════════════════════════════════════════════════════════════════════
//  Firebase configuration — SHARED by the game (word-do.html) and the
//  admin dashboard (admin.html).
//
//  ▶ HOW TO FILL THIS IN (one-time, ~3 minutes):
//    1. Go to https://console.firebase.google.com  → "Add project"
//    2. Inside the project, click the </> (Web) icon to "Add app"
//    3. Firebase shows you a `firebaseConfig = { ... }` object — copy its
//       values into the object below (apiKey, authDomain, projectId, etc.)
//    4. In the left menu open  Build → Firestore Database → "Create database"
//       (start in *test mode* for now; tighten the rules later — see README)
//
//  Until you paste real values here, the game runs in OFFLINE mode:
//  results are kept in the browser only and NOT sent to the admin.
// ════════════════════════════════════════════════════════════════════════

export const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID",
};

// Password required to open the admin dashboard.
// ▶ Change this to your own secret before publishing.
export const ADMIN_PASSWORD = "admin123";

// ── Internal helpers ─────────────────────────────────────────────────────
export const isConfigured =
  !firebaseConfig.apiKey.startsWith("PASTE_") &&
  !firebaseConfig.projectId.startsWith("PASTE_");

let _db = null;

// Lazily initialise Firebase and return the Firestore instance (or null if
// the config has not been filled in yet).
export async function getDb() {
  if (!isConfigured) return null;
  if (_db) return _db;
  const { initializeApp } = await import(
    "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"
  );
  const { getFirestore } = await import(
    "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"
  );
  const app = initializeApp(firebaseConfig);
  _db = getFirestore(app);
  return _db;
}
