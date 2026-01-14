import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Button from '../ui/Button';
import './ProblemCard.css';

const ProblemCard = ({ problem, type = 'challenge' }) => {
    const navigate = useNavigate();

    const getDifficultyVariant = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'easy':
                return 'easy';
            case 'medium':
                return 'medium';
            case 'hard':
                return 'hard';
            default:
                return 'medium';
        }
    };

    const handleStartProblem = () => {
        navigate(`/code/${problem.id}`);
    };

    return (
        <Card className="problem-card">
            <div className="problem-card-header">
                {type === 'revision' && (
                    <div className="revision-badge">
                        👻 Ghost Revision
                    </div>
                )}
                <div className="badges-row">
                    <Badge variant={getDifficultyVariant(problem.difficulty)}>
                        {problem.difficulty}
                    </Badge>
                    <Badge variant="pattern">{problem.pattern}</Badge>
                </div>
            </div>

            <div className="problem-card-body">
                <h3>{problem.title}</h3>
                <p className="problem-description">
                    {problem.description.split('\n')[0].substring(0, 120)}...
                </p>
            </div>

            <div className="problem-card-footer">
                <Button
                    variant="primary"
                    onClick={handleStartProblem}
                    className="start-btn"
                >
                    {type === 'revision' ? 'Retry Problem' : 'Start Challenge'}
                    <span className="arrow">→</span>
                </Button>
            </div>
        </Card>
    );
};

export default ProblemCard;
