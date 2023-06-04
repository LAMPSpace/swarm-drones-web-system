import { Card } from 'react-bootstrap';
import Link from 'next/link';

export default function CardNumber({ title, number, link }) {
    return (
        <Card className="border-0 shadow-sm">
            <Link href={link} className="card border-0 h-100 shadow-sm text-decoration-none">
                <Card.Body className="d-flex">
                    <div className="d-flex flex-column justify-content-center flex-grow-1">
                        <div className='text-muted mb-1'>
                            {title}
                        </div>
                        <div className='font-weight-bold h4 mb-0'>
                            {number}
                        </div>
                    </div>
                </Card.Body>
            </Link>
        </Card>
    );
}