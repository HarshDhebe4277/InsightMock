import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    onClick,
    disabled = false,
    loading = false,
    type = 'button',
    ...props
}) => {
    const className = `btn btn-${variant} ${disabled || loading ? 'disabled' : ''}`;

    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <span className="spinner"></span>
                    Loading...
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
