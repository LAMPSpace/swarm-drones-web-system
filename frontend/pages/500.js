import Link from 'next/link'

export default function Custom500() {
    return (
        <div className="container text-center">
            <h1 className="display-1">500</h1>
            <p className="lead">Lỗi Hệ Thống</p>
            <p>Đã xảy ra lỗi hệ thống, vui lòng thử lại sau.</p>
            <Link className="btn btn-primary" href="/">Quay lại Trang Chủ</Link>
        </div>
    )
}