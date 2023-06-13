import { useEffect, useState } from "react";

const Paginator = ({ pagination, pageChanged, totalItems }) => {
    const [pageNumbers, setPageNumbers] = useState([])

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
                        >
                            <span className={"page-link"}>
                                Previous
                            </span>
                        </li>
                        <li
                            className={"page-item " + (pagination?.current_page === pagination?.last_page ? "disabled" : "")}
                        >
                            <span className={"page-link"}>
                                Next
                            </span>
                        </li>
                    </ul>
                </nav>
                <nav className={"d-none d-md-block"}>
                    <ul className={"pagination"}>
                        <li
                            className={"page-item " + (pagination?.current_page === 1 ? "disabled" : "")}
                            onClick={() => pageChanged(pagination?.current_page - 1)}
                            aria-label={"« Previous"}
                            aria-disabled={true}
                        >
                            <span className={"page-link"} aria-hidden={true}>«</span>
                        </li>
                        {pageNumbers.map((page, index) => {
                            return (
                                <li
                                    key={index}
                                    className={"page-item " + (pagination?.current_page === page ? "active" : "")}
                                    onClick={() => pageChanged(page)}
                                >
                                    <span className={"page-link"}>{page}</span>
                                </li>
                            )
                        })}
                        <li
                            className={"page-item " + (pagination?.current_page === pagination?.last_page ? "disabled" : "")}
                            onClick={() => pageChanged(pagination?.current_page + 1)}
                            aria-label={"Next »"}
                            aria-disabled={true}
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