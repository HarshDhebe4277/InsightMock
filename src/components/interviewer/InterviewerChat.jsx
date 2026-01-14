import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { processInterviewTurn } from '../../services/groq';
import { updateInterviewScore } from '../../services/firestore';
import Button from '../ui/Button';
import confetti from 'canvas-confetti';
import './InterviewerChat.css';

const InterviewerChat = ({ problem, userCode, onClose }) => {
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState([]);
    const [history, setHistory] = useState([]); // Array of { role: 'ai' | 'user', content: string }
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [questionAsked, setQuestionAsked] = useState(false);
    const [interviewComplete, setInterviewComplete] = useState(false);
    const messagesEndRef = useRef(null);

    // Initial kickoff
    useEffect(() => {
        const startInterview = async () => {
            // Initial AI message (UI only)
            const welcomeMessage = {
                type: 'ai',
                content: `Great job solving "${problem.title}"! 🎉\n\nNow let's discuss your solution. I have a question for you...`,
                timestamp: new Date().toISOString(),
            };
            setMessages([welcomeMessage]);
            setIsTyping(true);

            // Get first question
            try {
                // Determine first question by sending empty history
                const turnResult = await processInterviewTurn([], problem.title, userCode);

                const questionMessage = {
                    type: 'ai',
                    content: turnResult.content,
                    timestamp: new Date().toISOString(),
                };

                setMessages(prev => [...prev, questionMessage]);
                setHistory(prev => [...prev, { role: 'ai', content: turnResult.content }]);
                setQuestionAsked(true);
            } catch (err) {
                // Error handling
            } finally {
                setIsTyping(false);
            }
        };

        // Delay slightly for effect
        const timer = setTimeout(startInterview, 1500);
        return () => clearTimeout(timer);
    }, [problem, userCode]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmitExplanation = async () => {
        if (!userInput.trim() || !questionAsked) return;

        // 1. Add User Message to UI and History
        const userMsg = {
            type: 'user',
            content: userInput,
            timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, userMsg]);

        const newHistory = [...history, { role: 'user', content: userInput }];
        setHistory(newHistory);

        setUserInput('');
        setIsTyping(true);
        setQuestionAsked(false); // Disable input while thinking

        // 2. Call AI for next turn
        try {
            const result = await processInterviewTurn(newHistory, problem.title, userCode);

            // 3. Handle Result
            if (result.type === 'feedback') {
                // Interview Over
                const feedbackMsg = {
                    type: 'ai',
                    content: result.content,
                    rating: result.rating,
                    timestamp: new Date().toISOString(),
                };
                setMessages(prev => [...prev, feedbackMsg]);
                setInterviewComplete(true);

                // Update Score
                if (currentUser && result.rating) {
                    const scoreChange = result.rating * 5;
                    updateInterviewScore(currentUser.uid, scoreChange);

                    if (result.rating >= 4) {
                        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                    }
                }
            } else {
                // Next Question
                const questionMsg = {
                    type: 'ai',
                    content: result.content,
                    timestamp: new Date().toISOString(),
                };
                setMessages(prev => [...prev, questionMsg]);
                setHistory(prev => [...prev, { role: 'ai', content: result.content }]);
                setQuestionAsked(true);
            }

        } catch (error) {
            setMessages(prev => [...prev, { type: 'ai', content: "Network error. Please try again." }]);
            setQuestionAsked(true);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmitExplanation();
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="interviewer-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="interviewer-chat"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                    {/* Header */}
                    <div className="interviewer-header">
                        <div className="interviewer-title">
                            <div className="ai-avatar">🤖</div>
                            <div>
                                <h3>AI Technical Interviewer</h3>
                                <p className="interviewer-status">
                                    {isTyping ? 'Typing...' : 'Active'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="messages-container">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.type}`}
                            >
                                {message.type === 'ai' && <div className="message-avatar">🤖</div>}
                                <div className="message-bubble">
                                    <p>{message.content}</p>
                                    {message.rating && (
                                        <div className="rating-stars">
                                            {'⭐'.repeat(message.rating)}
                                            <span className="rating-text">
                                                {message.rating}/5 - {
                                                    message.rating >= 4 ? 'Excellent!' :
                                                        message.rating >= 3 ? 'Good!' : 'Keep practicing!'
                                                }
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {message.type === 'user' && (
                                    <div className="message-avatar user-avatar">
                                        {currentUser?.displayName?.charAt(0) || 'U'}
                                    </div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="message ai">
                                <div className="message-avatar">🤖</div>
                                <div className="message-bubble typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="chat-input-container">
                        {!interviewComplete ? (
                            <>
                                <textarea
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your explanation here..."
                                    className="chat-input"
                                    rows="3"
                                    disabled={!questionAsked || isTyping}
                                />
                                <Button
                                    variant="primary"
                                    onClick={handleSubmitExplanation}
                                    disabled={!userInput.trim() || !questionAsked || isTyping}
                                    className="send-button"
                                >
                                    Send Answer →
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="success"
                                onClick={onClose}
                                className="close-button"
                            >
                                Complete Interview & Return to Dashboard
                            </Button>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default InterviewerChat;
