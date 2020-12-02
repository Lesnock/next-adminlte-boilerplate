import AdminLayout from '../layouts/admin'
import { BreadcrumbItem } from '../components/Breadcrumb'

export default function Produtos() {
  const breadcrumb: BreadcrumbItem[] = [
    { name: 'Home', link: '/' },
    { name: 'Produtos', link: '/produtos', active: true }
  ]

  return (
    <AdminLayout
      title="Produtos"
      actives={['products']}
      breadcrumb={breadcrumb}
    ></AdminLayout>
  )
}
