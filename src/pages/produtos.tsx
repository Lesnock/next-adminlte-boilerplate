import { useEffect } from 'react'
import { useRouter } from 'next/router'

import AdminLayout from '../layouts/admin'
import tableStore from '../stores/TableStore'
import FetchTable from '../components/FetchTable'
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

function Produtos() {
  const router = useRouter()

  useEffect(() => {
    tableStore.update('sort', router.query.sort || 'id')
    tableStore.update('order', router.query.order || 'desc')
    tableStore.update('limit', router.query.limit || 4)
  }, []) //eslint-disable-line

  // eslint-disable-next-line
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

  return (
    <AdminLayout
      title="Produtos"
      actives={['products']}
      breadcrumb={breadcrumb}
    >
      <FetchTable url="/products" headers={headers} makeRow={makeRow} />
    </AdminLayout>
  )
}

export default Produtos
