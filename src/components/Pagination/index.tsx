import { useEffect, MouseEvent } from 'react'
import { usePageState } from '../../contexts/PageStateContext'

import { calculatePagination } from '../../helpers'

const Pagination = () => {
  const { currentPage, setCurrentPage, totalPage, limit } = usePageState()
  const pages = calculatePagination(totalPage, currentPage)

  const next = (event: MouseEvent) => {
    event.preventDefault()
    if (currentPage + 1 < totalPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="card-footer clearfix">
      <ul className="pagination pagination-md m-0 float-right">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="#">
            «
          </a>
        </li>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="#">
            ‹
          </a>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? 'active' : ''}`}
          >
            <a className="page-link" href="#">
              {page}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}
        >
          <a className="page-link" href="#" onClick={next}>
            ›
          </a>
        </li>
        <li
          className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}
        >
          <a className="page-link" href="">
            »
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
