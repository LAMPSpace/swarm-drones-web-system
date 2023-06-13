import Link from 'next/link'

export default function Custom403() {
    return (
        <div className="container text-center">
            <h1 className="display-1">403</h1>
            <p className="lead">Không Đủ Quyền Truy Cập</p>
            <p>Bạn không có quyền truy cập vào trang này.</p>
            <Link className="btn btn-primary" href="/">Quay lại Trang Chủ</Link>
        </div>
    )
}