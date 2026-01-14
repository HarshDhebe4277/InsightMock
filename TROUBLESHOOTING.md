# Troubleshooting Guide: Buttons Not Working

## Issue: Smart Hint and Run Code buttons not responding

### Quick Checks:

1. **Open Browser Console** (F12)
   - Click the Console tab
   - Try clicking "Smart Hint" or "Run Code"
   - Look for any red error messages
   - Take a screenshot and share if you see errors

2. **Check Gemini API Key**
   Open your `.env` file and verify:
   ```env
   VITE_GEMINI_API_KEY=AIza...your_actual_key_here
   ```
   
   Common issues:
   - ❌ Key is set to `your_gemini_api_key_here` (placeholder, not real)
   - ❌ Missing `VITE_` prefix
   - ❌ Extra spaces or quotes around the key
   
   **How to fix**: Get your real API key from https://aistudio.google.com/app/apikey

3. **Restart Dev Server** (Required after changing .env)
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

4. **Check Firebase Config**
   Make sure all Firebase variables are filled in `.env`:
   ```env
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=dsa-insightmock.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=dsa-insightmock
   VITE_FIREBASE_STORAGE_BUCKET=dsa-insightmock.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=465156163540
   VITE_FIREBASE_APP_ID=1:465156163540:web:8b8af452d9677a31d0b841
   ```

### Expected Behavior:

**Smart Hint Button:**
- Should show loading spinner
- After 2-3 seconds, a toast notification appears with AI-generated hint
- If it fails, check console for error message

**Run Code Button:**
- Button becomes disabled
- After 2 seconds, test results appear below the editor
- Shows "Test Case 1: ✓ Passed" or "✗ Failed"

### What to do next:

1. Press F12 in your browser
2. Go to Console tab  
3. Click "Smart Hint" button
4. Copy any error messages you see
5. Share the error messages so I can help debug

### If you see "VITE_GEMINI_API_KEY is undefined":
You need to:
1. Open `.env` file
2. Add your real Gemini API key
3. Stop the dev server (Ctrl+C in terminal)
4. Run `npm run dev` again
5. Refresh the browser

### Test if buttons work at all:

Try clicking "Run Code" first - this doesn't need Gemini API and should always work.
If "Run Code" doesn't work either, there's a different issue.
