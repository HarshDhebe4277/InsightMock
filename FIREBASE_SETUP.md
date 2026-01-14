# Firebase Setup Instructions

Follow these steps to set up Firebase for DSA InsightMock.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `dsa-insightmock` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click **"Create project"**

## Step 2: Enable Google Authentication

1. In your Firebase project dashboard, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Go to the **"Sign-in method"** tab
4. Click on **"Google"** in the providers list
5. Toggle the **"Enable"** switch to ON
6. Enter a project support email (your email)
7. Click **"Save"**

## Step 3: Enable Firestore Database

1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
   - Test mode allows read/write access without authentication rules
   - ⚠️ **Important**: Before deploying to production, change to production mode and add proper security rules
4. Choose a Cloud Firestore location (select closest to your region)
5. Click **"Enable"**

## Step 4: Register Your Web App

1. In the Firebase project overview, click the **web icon** (`</>`) to add a web app
2. Enter app nickname: `DSA InsightMock Web`
3. **Do NOT** check "Also set up Firebase Hosting" (not needed for this MVP)
4. Click **"Register app"**
5. You'll see a configuration object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

6. **Copy these values** - you'll need them in the next step

## Step 5: Configure Environment Variables

1. In your project root, create a `.env` file (copy from `.env.example`)
2. Fill in your Firebase configuration:

```env
# Google Gemini API Key (you already have this)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration (from Step 4)
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

3. Save the file
4. **⚠️ NEVER commit `.env` to version control** (it's already in `.gitignore`)

## Step 6: Add Authorized Domain (for Google Sign-In)

1. In Firebase Console, go to **Authentication** > **Settings** tab
2. Scroll to **"Authorized domains"**
3. `localhost` should already be there by default
4. If deploying, add your production domain here later

## Step 7: (Optional) Set Up Firestore Security Rules

For production, update Firestore rules:

1. Go to **Firestore Database** > **Rules** tab
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write only their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read problems
    match /problems/{problemId} {
      allow read: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

## Verification

Once setup is complete:

1. Run `npm run dev` in your project
2. Open the app at `http://localhost:5173`
3. Click "Sign in with Google"
4. If successful, you should see the Dashboard

## Troubleshooting

**Error: "Firebase: Error (auth/unauthorized-domain)"**
- Add `localhost` to authorized domains in Firebase Console (Step 6)

**Error: "Firebase: Error (auth/popup-blocked)"**
- Allow popups in your browser for `localhost`

**Firestore permission denied error:**
- Make sure you're in "test mode" (Step 3) for development
- For production, update security rules (Step 7)

---

✅ **Setup Complete!** Your Firebase project is now ready for DSA InsightMock.
