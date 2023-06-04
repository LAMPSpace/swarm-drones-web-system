export default function InputText({ disabled = false, className, ...props }) {
    return <input className={`form-control ${className}`} disabled={disabled} {...props} />
}