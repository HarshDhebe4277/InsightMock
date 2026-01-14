import { useState } from 'react';
import { signInWithGoogle } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import './Login.css';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError('');

        try {
            await signInWithGoogle();
            navigate('/dashboard');
        } catch (error) {
            console.error('Sign in error:', error);
            setError('Failed to sign in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-bg-pattern"></div>

            <div className="login-container fade-in">
                <div className="login-content">
                    {/* Logo and Branding */}
                    <div className="login-header">
                        <div className="login-logo">💡</div>
                        <h1 className="text-gradient">DSA InsightMock</h1>
                        <p className="login-tagline">
                            Pattern-based learning powered by AI
                        </p>
                    </div>

                    {/* Features Highlight */}
                    <div className="login-features">
                        <div className="feature-item">
                            <span className="feature-icon">🎯</span>
                            <span>Pattern Mastery Tracking</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🤖</span>
                            <span>AI Interview Simulator</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">📈</span>
                            <span>Personalized Daily Sprints</span>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {/* Sign In Button */}
                    <Button
                        variant="primary"
                        onClick={handleGoogleSignIn}
                        loading={loading}
                        className="google-signin-btn"
                    >
                        {!loading && (
                            <>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                                    <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332A8.997 8.997 0 0 0 9.003 18z" fill="#34A853" />
                                    <path d="M3.964 10.712A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.96A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.96 4.042l3.004-2.33z" fill="#FBBC05" />
                                    <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.003 0A8.997 8.997 0 0 0 .96 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335" />
                                </svg>
                                Sign in with Google
                            </>
                        )}
                    </Button>

                    {/* Footer */}
                    <div className="login-footer">
                        <p>Powered by Google Gemini & Firebase</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
