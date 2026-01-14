const Badge = ({ children, variant = 'pattern', ...props }) => {
    return (
        <span className={`badge badge-${variant}`} {...props}>
            {children}
        </span>
    );
};

export default Badge;
