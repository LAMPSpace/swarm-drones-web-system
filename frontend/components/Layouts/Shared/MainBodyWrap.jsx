export default function MainBodyWrap({ isFluid=false, children }) {
    return (
        <div className={isFluid ? 'container-fluid py-2 my-2' : 'container py-3 my-3'}>
            {children}
        </div>
    );
}