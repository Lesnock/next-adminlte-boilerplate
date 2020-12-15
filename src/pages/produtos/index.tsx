import { toast } from 'react-toastify'

import api from 'services/api'
import useUpdate from 'hooks/update'
import AdminLayout from 'layouts/admin'

import Button from 'components/Button'
import Progress from 'components/Progress'
import FetchTable from 'components/FetchTable'
import LinkButton from 'components/LinkButton'
import { BreadcrumbItem } from 'components/Breadcrumb'
// import ListTableFilter from 'table-filters/ListTableFilter'

function Produtos() {
  const forceUpdate = useUpdate()

  const breadcrumb: BreadcrumbItem[] = [
    { name: 'Home', link: '/' },
    { name: 'Produtos', link: '/produtos', active: true }
  ]

  const headers = [
    { label: 'ID', name: 'id', sortable: true, searchable: true, small: true },

    { label: 'Nome', name: 'name', sortable: true, searchable: true },

    { label: 'NCM', name: 'ncm', sortable: true, searchable: true },

    {
      label: 'Cód. Protheus',
      name: 'protheus_cod',
      sortable: true,
      searchable: true
    },

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

  // eslint-disable-next-line
  function makeRow(row) {
    return [
      row.id,

      row.name,

      row.ncm,

      row.protheus_cod,

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

        <Button type="danger" onClick={() => destroy(row.id)}>
          Excluir
        </Button>
      </>
    ]
  }

  async function destroy(id: number) {
    const isConfirmed = confirm(`Você realmente quer deletar o registro ${id}?`)

    if (isConfirmed) {
      try {
        await api.delete(`/products/${id}`)
        toast.success('Registro excluído com sucesso')
        forceUpdate()
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <AdminLayout
      title="Produtos"
      actives={['products']}
      breadcrumb={breadcrumb}
    >
      <div className="col-12" style={{ marginBottom: '10px' }}>
        <LinkButton type="primary" href="/produtos/adicionar" size="md">
          <i className="fas fa-plus"></i> Adicionar
        </LinkButton>
      </div>
      <FetchTable
        title="Produtos"
        url="/products"
        headers={headers}
        makeRow={makeRow}
        // filters={[ListTableFilter]}
      />
    </AdminLayout>
  )
}

type StockProgressProps = { min: number; max: number; quantity: number }

const StockProgress = ({ min, max, quantity }: StockProgressProps) => {
  let width = 0

  // Calculate progress width
  if (quantity <= min) {
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
