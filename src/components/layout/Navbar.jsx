import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import './Navbar.css';

const Navbar = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error(' Error logging out:', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand" onClick={() => navigate('/dashboard')}>
                    <span className="logo-icon">💡</span>
                    <h2 className="text-gradient">DSA InsightMock</h2>
                </div>

                {currentUser && (
                    <div className="navbar-actions">
                        <div className="user-info">
                            <img
                                src={currentUser.photoURL}
                                alt={currentUser.displayName}
                                className="user-avatar"
                            />
                            <span className="user-name">{currentUser.displayName}</span>
                        </div>
                        <Button variant="ghost" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
