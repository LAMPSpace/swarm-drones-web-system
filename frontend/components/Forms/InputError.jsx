export default function InputError({ message = [] }) {
    return (
        <>
            {message.length > 0 && (
                <>
                    {message.map((error, index) => (
                        <span className="invalid-feedback" role="alert" key={index}>
                            <strong>{error}</strong>
                        </span>
                    ))}
                </>
            )}
        </>
    );
}