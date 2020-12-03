import { useEffect } from 'react'

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

const rows = [
  [1, 'Caneta Bic Azul', 'Unidade', 1, 'R$ 7,00'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99'],
  [2, 'Bobina de papel para relógio de ponto', 'Unidade', 5, 'R$ 5,99']
]

export default function Produtos() {
  useEffect(() => {
    tableStore.update('totalPages', 10)
  })

  return (
    <AdminLayout
      title="Produtos"
      actives={['products']}
      breadcrumb={breadcrumb}
    >
      <Table
        headers={headers}
        rows={rows}
        withSearchbar={true}
        withFieldSearch={true}
      />
    </AdminLayout>
  )
}
