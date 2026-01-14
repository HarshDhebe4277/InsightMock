import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/layout/Navbar';
import ProblemCard from '../components/dashboard/ProblemCard';
import MasteryMap from '../components/dashboard/MasteryMap';
import problemsData from '../data/problems.json';
import './Dashboard.css';

const Dashboard = () => {
    const { currentUser, userProfile } = useAuth();
    const [challengeProblem, setChallengeProblem] = useState(null);
    const [revisionProblem, setRevisionProblem] = useState(null);
    const [focusPattern, setFocusPattern] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        console.log('Dashboard - userProfile:', userProfile);
        console.log('Dashboard - currentUser:', currentUser);

        // Default mastery map if profile isn't loaded yet
        const defaultMasteryMap = {
            'Sliding Window': 20,
            'Two Pointers': 20,
            'Dynamic Programming': 20,
            'Tree/Graph': 20,
            'Greedy': 20,
        };

        const masteryMap = userProfile?.masteryMap || defaultMasteryMap;

        // Find the weakest pattern
        const weakestPattern = Object.entries(masteryMap)
            .sort(([, a], [, b]) => a - b)[0][0];

        setFocusPattern(weakestPattern);

        // Get problems for the weakest pattern
        const patternProblems = problemsData.problems.filter(
            p => p.pattern === weakestPattern
        );

        console.log('Weakest pattern:', weakestPattern);
        console.log('Pattern problems:', patternProblems);

        // Select a challenge problem (hardcoded for demo)
        if (patternProblems.length > 0) {
            setChallengeProblem(patternProblems[0]);
            console.log('Challenge problem set:', patternProblems[0].title);
        } else {
            // Fallback to first problem if no pattern match
            setChallengeProblem(problemsData.problems[0]);
            console.log('Fallback challenge problem set');
        }

        // Select a revision problem (different pattern for variety)
        const allProblems = problemsData.problems;
        const revisionIdx = Math.floor(Math.random() * allProblems.length);
        setRevisionProblem(allProblems[revisionIdx]);
        console.log('Revision problem set:', allProblems[revisionIdx].title);
    }, [userProfile, currentUser]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="dashboard-page">
            <Navbar />

            <div className="dashboard-container">
                {/* Welcome Section */}
                <div className="welcome-section fade-in">
                    <h1 className="welcome-greeting">
                        {getGreeting()}, {currentUser?.displayName?.split(' ')[0]}! 👋
                    </h1>
                    <p className="welcome-subtitle">
                        Ready to level up your DSA skills today?
                    </p>
                </div>

                {/* Today's Focus Banner */}
                <div className="focus-banner slide-in-right">
                    <div className="focus-banner-content">
                        <span className="focus-icon">🎯</span>
                        <div>
                            <h3>Today's Focus</h3>
                            <p className="text-gradient">{focusPattern}</p>
                        </div>
                    </div>
                </div>

                {/* Morning Sprint Section */}
                <div className="morning-sprint-section">
                    <h2 className="section-title">⚡ Morning Sprint</h2>
                    <p className="section-description">
                        Your personalized daily challenges to build interview-ready intuition
                    </p>

                    <div className="problems-grid">
                        {challengeProblem && (
                            <div className="fade-in" style={{ animationDelay: '0.1s' }}>
                                <ProblemCard problem={challengeProblem} type="challenge" />
                            </div>
                        )}

                        {revisionProblem && (
                            <div className="fade-in" style={{ animationDelay: '0.2s' }}>
                                <ProblemCard problem={revisionProblem} type="revision" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Explore More Section */}
                <div className="explore-section fade-in" style={{ animationDelay: '0.25s', marginBottom: '48px' }}>
                    <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                            <h2 className="section-title">📚 Problem Library</h2>
                            <p className="section-description" style={{ marginBottom: 0 }}>
                                Explore more problems to strengthen your mastery
                            </p>
                        </div>
                        <div className="search-container" style={{ position: 'relative', width: '300px', maxWidth: '100%' }}>
                            <input
                                type="text"
                                placeholder="Search by title or topic..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-light)',
                                    background: 'var(--bg-tertiary)',
                                    color: 'var(--text-primary)',
                                    outline: 'none',
                                    fontSize: '0.9rem',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                            />
                        </div>
                    </div>

                    <div className="problems-grid">
                        {problemsData.problems
                            .filter(p => {
                                const matchesSearch =
                                    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    p.pattern.toLowerCase().includes(searchTerm.toLowerCase());
                                const notInSprint = p.id !== challengeProblem?.id && p.id !== revisionProblem?.id;
                                return matchesSearch && notInSprint;
                            })
                            .map((problem) => (
                                <ProblemCard
                                    key={problem.id}
                                    problem={problem}
                                    type="practice"
                                />
                            ))}

                        {problemsData.problems.filter(p =>
                            (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                p.pattern.toLowerCase().includes(searchTerm.toLowerCase())) &&
                            p.id !== challengeProblem?.id &&
                            p.id !== revisionProblem?.id
                        ).length === 0 && (
                                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                                    <p>No problems found matching "{searchTerm}"</p>
                                </div>
                            )}
                    </div>
                </div>

                {/* Mastery Map Section */}
                <div className="mastery-section fade-in" style={{ animationDelay: '0.3s' }}>
                    <MasteryMap masteryData={userProfile?.masteryMap || {
                        'Sliding Window': 20,
                        'Two Pointers': 20,
                        'Dynamic Programming': 20,
                        'Tree/Graph': 20,
                        'Greedy': 20,
                    }} />
                </div>

                {/* Stats Section */}
                <div className="stats-section fade-in" style={{ animationDelay: '0.4s' }}>
                    <div className="stat-card glass-card">
                        <div className="stat-icon">✅</div>
                        <div className="stat-content">
                            <h4>{userProfile?.problemsSolved?.length || 0}</h4>
                            <p>Problems Solved</p>
                        </div>
                    </div>

                    <div className="stat-card glass-card">
                        <div className="stat-icon">🎤</div>
                        <div className="stat-content">
                            <h4>{userProfile?.interviewReadinessScore || 0}%</h4>
                            <p>Interview Readiness</p>
                        </div>
                    </div>

                    <div className="stat-card glass-card">
                        <div className="stat-icon">🔥</div>
                        <div className="stat-content">
                            <h4>{userProfile?.problemsAttempted?.length || 0}</h4>
                            <p>Total Attempts</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
