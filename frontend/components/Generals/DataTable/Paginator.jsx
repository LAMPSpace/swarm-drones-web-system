import { useEffect, useState } from "react";

const OFFSET = 4

const Paginator = ({ pagination, pageChanged, totalItems }) => {
    const [pageNumbers, setPageNumbers] = useState([])

    useEffect(() => {
        const setPaginationPages = () => {
            let pages = []
            const { last_page, current_page, from, to } = pagination
            if (!to) return []
            let fromPage = current_page - OFFSET
            if (fromPage < 1) fromPage = 1
            let toPage = fromPage + OFFSET * 2
            if (toPage >= last_page) {
                toPage = last_page
            }
            for (let page = fromPage; page <= toPage; page++) {
                pages.push(page)
            }
            setPageNumbers(pages)
        }

        setPaginationPages()
    }, [pagination])

    return (
        <div className={"row"}>
            <div className={"col"}>
                <div className={"mt-2 mb-3"}>
                    Hiển thị {pagination?.from} - {pagination?.to} trên {pagination?.total} kết quả
                </div>
            </div>
            <div className={"col-auto"}>
                <nav className={"d-block d-md-none"}>
                    <ul className={"pagination"}>
                        <li
                            className={"page-item " + (pagination?.current_page === 1 ? "disabled" : "")}
                            role="button"
                            onClick={() => pageChanged(pagination?.current_page - 1)}
                        >
                            <span className={"page-link"}>
                                Trước
                            </span>
                        </li>
                        <li
                            className={"page-item " + (pagination?.current_page === pagination?.last_page ? "disabled" : "")}
                            role="button"
                            onClick={() => pageChanged(pagination?.current_page + 1)}
                        >
                            <span className={"page-link"}>
                                Sau
                            </span>
                        </li>
                    </ul>
                </nav>
                <nav className={"d-none d-md-block"}>
                    <ul className={"pagination"}>
                        <li
                            className={"page-item " + (pagination?.current_page === 1 ? "disabled" : "")}
                            onClick={() => pageChanged(pagination?.current_page - 1)}
                            aria-label={"« Trước"}
                            aria-disabled={true}
                            role="button"
                        >
                            <span className={"page-link"} aria-hidden={true}>«</span>
                        </li>
                        {pageNumbers.map((page, index) => {
                            return (
                                <li
                                    key={index}
                                    className={"page-item " + (pagination?.current_page === page ? "active" : "")}
                                    onClick={() => pageChanged(page)}
                                    role="button"
                                >
                                    <span className={"page-link"}>{page}</span>
                                </li>
                            )
                        })}
                        <li
                            className={"page-item " + (pagination?.current_page === pagination?.last_page ? "disabled" : "")}
                            onClick={() => pageChanged(pagination?.current_page + 1)}
                            aria-label={"Sau »"}
                            aria-disabled={true}
                            role="button"
                        >
                            <span className={"page-link"} aria-hidden={true}>»</span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Paginator