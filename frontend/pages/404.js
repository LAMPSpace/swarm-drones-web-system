import Link from 'next/link'

export default function Custom404() {
    return (
        <div className="container text-center">
            <h1 className="display-1">404</h1>
            <p className="lead">Không Tìm Thấy Trang</p>
            <p>Trang bạn đang tìm kiếm có thể đã bị xóa hoặc không tồn tại.</p>
            <Link className="btn btn-primary" href="/">Quay lại Trang Chủ</Link>
        </div>
    )
}