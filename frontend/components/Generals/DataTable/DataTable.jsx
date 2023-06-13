import { useState, useEffect, useRef } from 'react'
import { debounce } from 'lodash'
import axios from '@/lib/axios'
import {
    SORT_ORDER,
    DEFAULT_SORT_ORDER,
    DEFAULT_PER_PAGE
} from "@/components/Constants/common.constant";
import {FaAngleDown, FaAngleUp} from "react-icons/fa";
import Paginator from "@/components/Generals/DataTable/Paginator";

const DataTable = ({ columns, fetchUrl, title='Tiêu đề' }) => {
    const [data, setData] = useState([])
    const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE)
    const [sortColumn, setSortColumn] = useState(columns[0].id)
    const [sortOrder, setSortOrder] = useState(DEFAULT_SORT_ORDER)
    const [search, setSearch] = useState("")
    const [pagination, setPagination] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const loaderStyle = { width: "4rem", height: "4rem" }

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortOrder(sortOrder === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC)
        } else {
            setSortColumn(column)
            setSortOrder(SORT_ORDER.ASC)
        }
    }

    const handleSearch = useRef(
        debounce((value) => {
            setSearch(value)
            setCurrentPage(1)
            setSortOrder(DEFAULT_SORT_ORDER)
            setSortColumn(columns[0].id)
        }, 500)
    ).current

    const handlePerPage = (value) => {
        setCurrentPage(1)
        setPerPage(value)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const params = {
                search,
                sort_field: sortColumn,
                sort_order: sortOrder,
                per_page: perPage,
                page: currentPage,
            }
            const { data } = await axios.get(fetchUrl, { params })
            setData(data)
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }

        fetchData()
    }, [sortColumn, sortOrder, perPage, currentPage])

    return (
        <div className={"card border-0 shadow-sm"}>
            <div className={"card-header align-items-center"}>
                <div className={"row"}>
                    <div className={"col"}>
                        {title}
                    </div>
                    <div className={"col-auto"}>
                        <div className={"input-group input-group-sm"}>
                            <input
                                type="text"
                                className={"form-control"}
                                placeholder={"Tìm kiếm"}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={"card-body"}>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className={"table-dark"}>
                            <tr>
                                {columns.map((column, index) => {
                                    return (
                                        <th key={column.id} onClick={(e) => handleSort(column.id)}>
                                            {column.label.toUpperCase()}
                                            {column.id === sortColumn ? (
                                                <span>
                                                    {sortOrder === SORT_ORDER.ASC ? (
                                                        <FaAngleUp className={"ms-1"} />
                                                    ) : (
                                                        <FaAngleDown className={"ms-1"} />
                                                    )}
                                                </span>
                                            ) : null}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td className={"text-center"} colSpan={columns.length}>Không có dữ liệu</td>
                                </tr>
                            ) : (
                                ""
                            )}

                            {!loading ? (
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            {columns.map((column, index) => {
                                                return (
                                                    <td key={index}>{item[column.id]}</td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={columns.length}>
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border text-primary" style={loaderStyle} role="status">
                                                <span className="sr-only">Đang tải dữ liệu...</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className={"mt-3 align-items-center"}>
                    <Paginator
                        pagination={pagination}
                        pageChanged={(page) => setCurrentPage(page)}
                        totalItems={data.length}
                    />
                </div>
            </div>
        </div>
    )
}

export default DataTable