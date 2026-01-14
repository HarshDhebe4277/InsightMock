# DSA InsightMock 💡

> **Pattern-based DSA learning platform powered by Groq AI.**
> Transform your coding preparation from random problem-solving into a personalized, pattern-mastery roadmap with real-time AI interview practice.

[![Demo Video](https://img.shields.io/badge/Watch-Demo_Video-red?style=for-the-badge&logo=youtube)](https://www.youtube.com/watch?v=Nl0Ge7nAqz8)
[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-11.1-ffca28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

---

## 📸 Screenshots

<div align="center">
  <img src="Screenshots\Dashboard.png" alt="Dashboard" width="800" />
  <p><em>Dashboard</em></p>
</div>

<div align="center">
  <img src="Screenshots\image.png" alt="Code Editor" width="800" />
  <p><em>Problem Solving Interface</em></p>
</div>

<div align="center">
  <img src="Screenshots\image copy.png" alt="AI Professor" width="800" />
  <p><em>AI Real World Explanation</em></p>
</div>

<div align="center">
  <img src="Screenshots\image copy 3.png" alt="AI Interviewer" width="800" />
  <p><em>AI Real Time Interviewer</em></p>
</div>

---

## 🌟 Key Features

- **🎯 Pattern Mastery Tracking**: Visual radar chart showing proficiency in algorithmic patterns (Sliding Window, DP, Two Pointers, Graph/Tree).
- **⚡ Morning Sprint**: Personalized daily challenges targeting your weak patterns to keep you consistent.
- **🤖 AI Technical Interviewer**: Post-submission chat overlay that asks intelligent follow-up questions about your solution (Time/Space complexity, edge cases). powered by **Groq**.
- **💡 Smart Hints**: Context-aware hints from AI that analyze your code without giving away the full solution.
- **🧠 Visual Analogies**: AI-generated real-world analogies to explain complex algorithm concepts simply.
- **📊 Progress Analytics**: Track problems solved, interview readiness score, and pattern growth over time.
- **🔥 Spaced Repetition**: "Ghost Revision" system to enhance long-term retention of difficult problems.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: React Router v6
- **State Management**: Context API
- **Animations**: Framer Motion

### UI & Styling
- **Styling**: Custom CSS with Glassmorphism design system
- **Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/) (VS Code's editor engine)
- **Charts**: Chart.js with `react-chartjs-2`
- **Icons**: React Icons / Lucide

### Backend & Services
- **Authentication**: Firebase Authentication (Google Sign-In)
- **Database**: Firebase Firestore (User profiles, progress tracking)
- **AI Engine**: [Groq Cloud](https://groq.com/) (Llama 3 / Mixtral) using `@langchain/groq`
- **Code Execution**: Piston API (Remote Code Execution Engine)

---

## 📦 Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- A Firebase Project
- A Groq Cloud API Key

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/dsa-insightmock.git
cd V1
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

**Edit `.env` and fill in your API keys:**

```env
# Groq AI Configuration (Get key from https://console.groq.com)
VITE_GROQ_API_KEY=your_groq_api_key_here

# Firebase Configuration (Get from Firebase Console -> Project Settings)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the development server
```bash
npm run dev
```

Open your browser and visit `http://localhost:5173` to see the app!

---

## 🎯 Usage Flow

1. **Sign In**: Use Google Sign-In to create your profile.
2. **Dashboard**: Check your "Mastery Map" and start your "Morning Sprint".
3. **Solve**: Select a problem. Use the **Monaco Editor** to write your solution (Python, C++, Java).
4. **Run & Test**: Hit "Run Code" to execute against test cases via the Piston engine.
5. **Get Help**: Stuck? Click **"Smart Hint"** for a nudge, or **"Visual Explanation"** for a concept breakdown.
6. **Submit**: Once all tests pass, submit your code.
7. **Interview**: The **AI Interviewer** will pop up to challenge your solution. Answer its questions!
8. **Growth**: Your mastery score updates instantly based on performance.

---

## 🏗️ Project Structure

```
V1/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable atoms (Button, Badge, Card)
│   │   ├── layout/          # Navbar, Layout wrappers
│   │   ├── dashboard/       # Dashboard widgets (PatternChart, StatCard)
│   │   ├── editor/          # Code editor & Console
│   │   └── interviewer/     # AI Chat Interface
│   ├── contexts/            # AuthContext, ThemeContext
│   ├── pages/               # Main Views (Login, Dashboard, CodeEditor)
│   ├── services/            # APIs (Firebase, Groq, CodeExecution)
│   ├── data/                # Static/Mock data (problems.json)
│   └── styles/              # Global CSS variables & resets
├── public/                  # Static assets
└── ...config files
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Firebase Auth Error** | Ensure `localhost` is added to "Authorized Domains" in Firebase Console. |
| **"API Key Missing"** | Check your `.env` file. Restart the Vite server after changing `.env`. |
| **Monaco Editor issues** | Refresh the page. Ensure hardware acceleration is on if scrolling is laggy. |
| **Execution Failed** | The Piston API might be rate-limited. Wait a moment and try again. |

---

## 👥 Credits

Built for **GDG Vesit TechSprint** Hackathon.

**Team Members:**
- Team Origin ( Harsh, Sahil, Dhruv, Shraddha )

**Powered By:**
- [Groq](https://groq.com/) for lightning-fast AI inference.
- [Firebase](https://firebase.google.com/) for serverless infrastructure.

---

