export default function Label({ className, children, ...props }) {
    return (
        <label className={`form-label ${className}`} {...props}>
            {children}
        </label>
    );
}