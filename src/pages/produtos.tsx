import Table from '../components/Table'
import AdminLayout from '../layouts/admin'
import { BreadcrumbItem } from '../components/Breadcrumb'

export default function Produtos() {
  const breadcrumb: BreadcrumbItem[] = [
    { name: 'Home', link: '/' },
    { name: 'Produtos', link: '/produtos', active: true }
  ]

  const headers = [
    { label: 'ID', name: 'id', sortable: true },
    { label: 'Nome', name: 'name', sortable: true }
  ]
  const rows = [
    [1, 'Caio Lesnock'],
    [2, 'Gabriela Lesnock']
  ]

  return (
    <AdminLayout
      title="Produtos"
      actives={['products']}
      breadcrumb={breadcrumb}
    >
      <Table headers={headers} rows={rows} />
    </AdminLayout>
  )
}
