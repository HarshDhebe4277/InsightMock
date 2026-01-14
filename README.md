# DSA InsightMock 💡

Pattern-based DSA learning platform powered by **Google Gemini AI**. Transform your coding preparation from random problem-solving into a personalized, pattern-mastery roadmap with real-time AI interview practice.

## 🌟 Key Features

- **🎯 Pattern Mastery Tracking**: Visual radar chart showing proficiency in algorithmic patterns (Sliding Window, DP, Two Pointers, Graph/Tree)
- **⚡ Morning Sprint**: Personalized daily challenges targeting your weak patterns
- **🤖 AI Technical Interviewer**: Post-submission chat overlay that asks intelligent follow-up questions about your solution
- **💡 Smart Hints**: Context-aware hints from Gemini that analyze your code without spoiling the solution
- **📊 Progress Analytics**: Track problems solved, interview readiness score, and pattern growth
- **🔥 Spaced Repetition**: Ghost Revision system to revisit problems you struggled with

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Custom CSS with Glassmorphism design
- **Code Editor**: Monaco Editor (VS Code's editor)
- **Charts**: Chart.js with React wrapper
- **AI**: Google Gemini Pro via AI Studio
- **Authentication**: Firebase Google Auth
- **Database**: Firestore for user profiles and progress
- **Animations**: Framer Motion
- **Router**: React Router v6

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd V1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (see `FIREBASE_SETUP.md` for detailed instructions)
   - Create a Firebase project
   - Enable Google Authentication
   - Enable Firestore Database
   - Get your Firebase config

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your keys:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser** at `http://localhost:5173`

## 🎯 Usage Flow

1. **Sign In**: Click "Sign in with Google" on the login page
2. **Dashboard**: View your Morning Sprint with 2 personalized problems
3. **Solve**: Click a problem to open the code editor
4. **Code**: Write your solution in Python, C++, or Java
5. **Run**: Test your code with sample test cases
6. **Submit**: Submit when all tests pass
7. **Interview**: AI Interviewer appears with a follow-up question
8. **Explain**: Type your explanation about time/space complexity
9. **Feedback**: Receive a star rating and constructive feedback
10. **Grow**: Watch your Mastery Map update in real-time!

## 🏗️ Project Structure

```
V1/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components (Button, Card, Badge)
│   │   ├── layout/          # Layout components (Navbar)
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── editor/          # Code editor components
│   │   └── interviewer/     # AI Interviewer chat overlay
│   ├── contexts/            # React contexts (AuthContext)
│   ├── pages/               # Page components (Login, Dashboard, CodeEditor)
│   ├── services/            # API integrations (Firebase, Gemini, Firestore)
│   ├── data/                # Mock data (problems.json)
│   ├── styles/              # Global styles
│   ├── App.jsx              # Main app component with routing
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── FIREBASE_SETUP.md        # Firebase setup guide
└── README.md                # This file
```

## 🎨 Design Philosophy

- **Glassmorphism**: Modern frosted glass effects for cards and overlays
- **Dark Theme**: Eye-friendly dark mode with vibrant accent colors
- **Smooth Animations**: Framer Motion for delightful micro-interactions
- **Gradient Accents**: Beautiful gradients for CTAs and highlights
- **Responsive**: Mobile-friendly design (though optimized for desktop coding)

## 🤖 Google Technologies Used

| Technology | Purpose |
|------------|---------|
| **Google Gemini (AI Studio)** | Generates context-aware hints, interview questions, and evaluates explanations |
| **Firebase Authentication** | Secure Google Sign-In for user management |
| **Firestore Database** | Stores user profiles, mastery maps, and problem attempt history |

## 📊 Data Model

### User Profile (Firestore)
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  masteryMap: {
    'Sliding Window': 45,
    'Two Pointers': 30,
    'Dynamic Programming': 60,
    'Tree/Graph': 50,
    'Greedy': 35
  },
  problemsAttempted: [...],
  problemsSolved: [...],
  interviewReadinessScore: 72,
  createdAt: timestamp,
  lastLogin: timestamp
}
```

## 🐛 Troubleshooting

**"Firebase: Error (auth/unauthorized-domain)"**
- Add `localhost` to authorized domains in Firebase Console

**Gemini API errors**
- Check that your API key is set correctly in `.env`
- Ensure you're using the free tier within limits

**Monaco Editor not loading**
- Clear browser cache and restart dev server

## 🚀 Deployment

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## 📝 License

MIT License - feel free to use this for your hackathon project!

## 👥 Credits

Built for **GDG Vesit TechSprint** hackathon.

Powered by:
- Google Gemini AI
- Firebase
- Monaco Editor
- Chart.js
- Framer Motion

---

**Made with ❤️ and lots of ☕**
