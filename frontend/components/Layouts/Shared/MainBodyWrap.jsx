export default function MainBodyWrap({ children }) {
    return (
        <div className="bg-base-1">
            <div className="container py-3 my-3">
                {children}
            </div>
        </div>
    );
}