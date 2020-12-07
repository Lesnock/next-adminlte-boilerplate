import { useEffect, useState, ReactNode } from 'react'
import { withRouter, Router } from 'next/router'
import { TableHeader } from '../../types'

import { setURLParams } from '../../helpers'

import Loading from '../Loading'
import SearchBar from '../SearchBar'
import Pagination from '../Pagination'
import SearchField from '../SearchField'

import tableStore from '../../stores/TableStore'

import styles from './Styles.module.css'

type Row = Array<string | number | ReactNode>

type TableProps = {
  title?: string
  headers?: TableHeader[]
  rows?: Row[]
  withSearchbar?: boolean
  withFieldSearch?: boolean
}

function Table({
  title = 'Tabela de Dados',
  headers = [],
  rows = [],
  withSearchbar = false,
  withFieldSearch = false,
  router
}: TableProps & { router: Router }) {
  const [sort, setSort] = useState(tableStore.get('sort'))
  const [order, setOrder] = useState(tableStore.get('order'))
  const [isLoading, setIsLoading] = useState(tableStore.get('isLoading'))

  // Listeners
  useEffect(() => {
    tableStore.listen('sort', setSort)
    tableStore.listen('order', setOrder)
    tableStore.listen('isLoading', setIsLoading)
  }, [])

  // Sort table
  const sortBy = (column: string) => {
    let newOrder = 'asc'

    if (sort === column && order === 'asc') {
      newOrder = 'desc'
    } else {
      newOrder = 'asc'
    }

    tableStore.update('sort', column)
    tableStore.update('order', newOrder)
    tableStore.update('currentPage', 1)

    setURLParams(router, { sort: column, order: newOrder, page: 1 })
  }

  // Search by field
  const searchByHeader = (column: string, search: string) => {
    const fieldsearchs = tableStore.get('fieldsearchs')

    if (search === '') {
      delete fieldsearchs[column]
      tableStore.update('fieldsearchs', fieldsearchs)
      tableStore.update('currentPage', 1)
      return
    }

    if (fieldsearchs[column] !== search) {
      tableStore.update('fieldsearchs', {
        ...fieldsearchs,
        [column]: search
      })

      tableStore.update('currentPage', 1)
    }
  }

  // Search by all
  const search = (value: string) => {
    if (value === '') {
      return tableStore.update('search', undefined)
    }

    tableStore.update('search', value)
  }

  // Get header icon according to header state
  const getSortableIcon = (header: TableHeader) => {
    if (!header.sortable) {
      return ''
    }

    if (header.name !== sort) {
      return 'fas fa-arrows-alt-v'
    }

    if (order === 'desc') {
      return 'fas fa-arrow-up'
    }

    return 'fas fa-arrow-down'
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">{title}</h3>
              <div className="card-tools">
                {withSearchbar && <SearchBar onChange={search} />}
              </div>
            </div>

            <div
              className="card-body table-responsive table-hover table-bordered p-0"
              style={{ position: 'relative' }}
            >
              {isLoading && <Loading />}
              <table className="table text-nowrap">
                <thead>
                  <tr>
                    {headers &&
                      headers.map((header, index) => (
                        <th
                          key={index}
                          className={header.sortable ? styles.sortable_th : ''}
                          style={{ width: header.small ? '100px' : '' }}
                          onClick={() => {
                            if (header.sortable) sortBy(header.name)
                          }}
                        >
                          {header.label}
                          {header.sortable && (
                            <i
                              className={`fas ${getSortableIcon(header)}
                              ${styles.sortable_icon}`}
                            />
                          )}
                        </th>
                      ))}
                  </tr>

                  {withFieldSearch && (
                    <tr>
                      {headers.map((header, index) => {
                        if (header.searchable) {
                          return (
                            <th key={index}>
                              <SearchField
                                header={header}
                                onChange={searchByHeader}
                              />
                            </th>
                          )
                        } else {
                          return <th key={index}></th>
                        }
                      })}
                    </tr>
                  )}
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-footer clearfix">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Table)
