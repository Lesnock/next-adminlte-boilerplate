import { useEffect, useState } from 'react'
import { withRouter, Router } from 'next/router'
import { TableHeader } from '../../types'

import api from '../../services/api'
import { delay, setURLParams } from '../../helpers'

import Table from '../Table'
import tableStore from '../../stores/TableStore'

type FetchTableProps = {
  router: Router
  url: string
  headers: TableHeader[]
  makeRow: (rows: []) => Array<[]>
}

function FetchTable({ url, headers, router, makeRow }: FetchTableProps) {
  const [results, setResults] = useState([])
  const [limit, setLimit] = useState(tableStore.get('limit'))
  const [sort, setSort] = useState(tableStore.get('sort'))
  const [order, setOrder] = useState(tableStore.get('order'))
  const [page, setPage] = useState(tableStore.get('currentPage'))

  // Listeners
  useEffect(() => {
    tableStore.listen('limit', setLimit)
    tableStore.listen('order', setOrder)
    tableStore.listen('sort', setSort)
    tableStore.listen('currentPage', setPage)
  }, [])

  useEffect(() => {
    // Get results with params
    async function getResults() {
      tableStore.update('isLoading', true)

      await delay(500)

      const params = {
        sort: tableStore.get('sort'),
        order: tableStore.get('order'),
        limit: tableStore.get('limit'),
        page: tableStore.get('currentPage')
      }

      const { data } = await api.get(url, {
        params
      })

      const totalPages = Math.ceil(data.total / limit)

      if (page > totalPages) {
        setURLParams(router, { page: 1 })
        tableStore.update('currentPage', 1)
      }

      tableStore.update('totalPages', totalPages)

      const rows = data.rows.map(makeRow)

      setResults(rows)
      tableStore.update('isLoading', false)
    }

    getResults()
  }, [url, limit, sort, order, page, router, makeRow])

  return (
    <Table
      headers={headers}
      rows={results}
      withSearchbar={true}
      withFieldSearch={true}
    />
  )
}

export default withRouter(FetchTable)