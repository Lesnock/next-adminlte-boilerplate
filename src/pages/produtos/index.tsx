import { useEffect } from 'react'
import { useRouter } from 'next/router'

import AdminLayout from 'layouts/admin'
import tableStore from 'stores/TableStore'

import Progress from 'components/Progress'
import FetchTable from 'components/FetchTable'
import LinkButton from 'components/LinkButton'
import { BreadcrumbItem } from 'components/Breadcrumb'

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
    router.query.sort && tableStore.update('sort', router.query.sort || 'id')
    router.query.order &&
      tableStore.update('order', router.query.order || 'desc')
    router.query.limit && tableStore.update('limit', router.query.limit)
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
      <StockProgress
        key={row.id}
        min={row.min_quantity}
        max={row.max_quantity}
        quantity={row.quantity}
      />,
      row.quantity,
      <>
        <LinkButton type="success" href={`/produtos/editar/${row.id}`}>
          Editar
        </LinkButton>

        <LinkButton type="danger" href={`/produtos/delete/${row.id}`}>
          Excluir
        </LinkButton>
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

type StockProgressProps = { min: number; max: number; quantity: number }
const StockProgress = ({ min, max, quantity }: StockProgressProps) => {
  let width = 0

  // Calculate progress width
  if (quantity < min) {
    width = 1
  } else if (quantity > max) {
    width = 100
  } else {
    const unity = 100 / (max - min)
    width = (quantity - min) * unity
  }

  return <Progress percentage={width} />
}

export default Produtos
