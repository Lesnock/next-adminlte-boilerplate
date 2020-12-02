import { useEffect, useState, ReactNode } from 'react'
import router from 'next/router'

import styles from './Styles.module.css'

type Header = {
  label: string
  name: string
  sortable: boolean
  searchable: boolean
}

type Row = Array<string | number | ReactNode>

type TableProps = {
  title?: string
  headers?: Header[]
  rows?: Row[]
  withSearchbar?: boolean
  withFieldSearch?: boolean
}

export default function Table({
  title = 'Tabela de Dados',
  headers = [],
  rows = [],
  withSearchbar = false,
  withFieldSearch = false
}: TableProps) {
  const { sort, order } = router.query

  const [ordering, setOrdering] = useState({
    sort: sort,
    order: order || 'asc'
  })

  // Sort table
  const sortBy = (column: string) => {
    if (ordering.sort === column && ordering.order === 'asc') {
      return setOrdering({ sort: column, order: 'desc' })
    }

    return setOrdering({ sort: column, order: 'asc' })
  }

  // Get header icon according to header state
  const getSortableIcon = (header: Header) => {
    if (!header.sortable) {
      return ''
    }

    if (header.name !== ordering.sort) {
      return 'fas fa-arrows-alt-v'
    }

    if (ordering.order === 'desc') {
      return 'fas fa-arrow-up'
    }

    return 'fas fa-arrow-down'
  }

  // React to ordering changes
  useEffect(() => {
    console.log(ordering)
  }, [ordering])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">{title}</h3>
              <div className="card-tools">
                {withSearchbar && (
                  <div
                    className="input-group input-group-sm"
                    style={{ width: 400 }}
                  >
                    <input
                      type="text"
                      name="table_search"
                      className="form-control float-right"
                      placeholder="Pesquisa"
                    />
                    <div className="input-group-append">
                      <button type="submit" className="btn btn-default">
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="card-body table-responsive p-0">
              <table className="table table-head-fixed text-nowrap">
                <thead>
                  <tr>
                    {headers &&
                      headers.map((header, index) => (
                        <th
                          key={index}
                          className={header.sortable ? styles.sortable_th : ''}
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
                </thead>
                <tbody>
                  {withFieldSearch && (
                    <tr>
                      {headers.map((header, index) => (
                        <td key={index}>
                          <input
                            type="text"
                            className="form-control float-right"
                            placeholder={
                              header.searchable
                                ? `Pesquisar por ${header.label}`
                                : '-'
                            }
                            disabled={!header.searchable}
                          />
                        </td>
                      ))}
                    </tr>
                  )}
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
          </div>
        </div>
      </div>
    </div>
  )
}
