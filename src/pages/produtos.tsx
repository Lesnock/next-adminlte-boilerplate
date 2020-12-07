import { useEffect } from 'react'
import { useRouter } from 'next/router'

import AdminLayout from '../layouts/admin'
import Progress from '../components/Progress'
import tableStore from '../stores/TableStore'
import FetchTable from '../components/FetchTable'
import { BreadcrumbItem } from '../components/Breadcrumb'

const breadcrumb: BreadcrumbItem[] = [
  { name: 'Home', link: '/' },
  { name: 'Produtos', link: '/produtos', active: true }
]

const headers = [
  { label: 'ID', name: 'id', sortable: true, searchable: true, small: true },

  { label: 'Nome', name: 'name', sortable: true, searchable: true },

  {
    label: 'Preço unit.',
    name: 'last_price',
    sortable: true,
    searchable: true,
    small: true
  },

  { label: 'Estoque', name: 'stock', sortable: false, searchable: false },

  {
    label: 'Qtd.',
    name: 'quantity',
    sortable: true,
    searchable: false,
    small: true
  },

  { label: 'Ações', name: 'actions', sortable: false, searchable: false }
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
      row.last_price.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      }),
      <Progress key={row.id} percentage={Math.random() * 100} />,
      row.quantity,
      <>
        <button type="button" className="btn btn-success btn-sm">
          Editar
        </button>

        <button
          type="button"
          className="btn btn-danger btn-sm"
          style={{ marginLeft: '5px' }}
        >
          Excluir
        </button>
      </>
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
