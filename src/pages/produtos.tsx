import { useEffect, useState } from 'react'

import api from '../services/api'

import Table from '../components/Table'
import AdminLayout from '../layouts/admin'
import tableStore from '../stores/TableStore'
import { BreadcrumbItem } from '../components/Breadcrumb'

const breadcrumb: BreadcrumbItem[] = [
  { name: 'Home', link: '/' },
  { name: 'Produtos', link: '/produtos', active: true }
]

const headers = [
  { label: 'ID', name: 'id', sortable: true, searchable: true },
  { label: 'Nome', name: 'name', sortable: true, searchable: true },
  {
    label: 'Unid. de Medida',
    name: 'unity',
    sortable: true,
    searchable: true
  },
  { label: 'Qtd.', name: 'quantity', sortable: true, searchable: true },
  {
    label: 'Último preço',
    name: 'last_price',
    sortable: true,
    searchable: false
  }
]

export default function Produtos() {
  const [products, setProducts] = useState([])
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
    function makeRow(row: { [Key: string]: any }) {
      return [
        row.id,
        row.name,
        row.unity,
        row.quantity,
        row.last_price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        })
      ]
    }

    // Get products based on params
    async function getProducts() {
      const params = {
        sort: tableStore.get('sort'),
        order: tableStore.get('order'),
        limit: tableStore.get('limit'),
        page: tableStore.get('currentPage')
      }

      const { data } = await api.get('/products', {
        params
      })

      tableStore.update('totalPages', Math.ceil(data.total / limit))

      const rows = data.rows.map(makeRow)

      setProducts(rows)
    }

    getProducts()
  }, [limit, sort, order, page])

  return (
    <AdminLayout
      title="Produtos"
      actives={['products']}
      breadcrumb={breadcrumb}
    >
      <Table
        headers={headers}
        rows={products}
        withSearchbar={true}
        withFieldSearch={true}
      />
    </AdminLayout>
  )
}
