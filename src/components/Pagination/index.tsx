import { useEffect, useState, MouseEvent } from 'react'

import tableStore from '../../stores/TableStore'

import { calculatePagination } from '../../helpers'

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(tableStore.get('currentPage'))
  const [totalPages, setTotalPages] = useState(tableStore.get('totalPages'))

  useEffect(() => {
    tableStore.listen('currentPage', setCurrentPage)
    tableStore.listen('totalPages', setTotalPages)
  }, [])

  // Go to Next Page
  const next = (event: MouseEvent) => {
    event.preventDefault()
    if (currentPage + 1 <= totalPages) {
      tableStore.update('currentPage', currentPage + 1)
    }
  }

  // Go to Previous Page
  const prev = (event: MouseEvent) => {
    event.preventDefault()
    if (currentPage - 1 > 0) {
      tableStore.update('currentPage', currentPage - 1)
    }
  }

  const goTo = (page: number) => {
    if (page > totalPages) {
      page = totalPages
    }

    if (page < 1) {
      page = 1
    }

    tableStore.update('currentPage', page)
  }

  const pages = calculatePagination(totalPages, currentPage)

  return (
    <div className="card-footer clearfix">
      <ul className="pagination pagination-md m-0 float-right">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="#"
            onClick={(event) => {
              event.preventDefault()
              goTo(1)
            }}
          >
            «
          </a>
        </li>
        <li
          className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={prev}
        >
          <a className="page-link" href="#">
            ‹
          </a>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? 'active' : ''}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={(event) => {
                event.preventDefault()
                goTo(page)
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <a className="page-link" href="#" onClick={next}>
            ›
          </a>
        </li>
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <a
            className="page-link"
            href=""
            onClick={(event) => {
              event.preventDefault()
              goTo(totalPages)
            }}
          >
            »
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
