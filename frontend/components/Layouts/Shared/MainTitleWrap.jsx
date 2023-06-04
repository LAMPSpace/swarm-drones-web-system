export default function MainTitleWrap({ children }) {
    return (
        <div className="bg-base-0">
            <div className="container py-5">
                {children}
            </div>
        </div>
    );
}