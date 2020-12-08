import { number } from 'validations'

import AdminLayout from 'layouts/admin'

import Form from 'components/Form'
import InputText from 'components/InputText'
import { BreadcrumbItem } from 'components/Breadcrumb'

const breadcrumb: BreadcrumbItem[] = [
  { name: 'Home', link: '/' },
  { name: 'Produtos', link: '/produtos' },
  { name: 'Editar', active: true }
]

const Edit = () => {
  const onSubmit = (values) => {
    console.log('enviou', values)
  }

  const validations = {
    name: number('nome').nullable().required('O campo nome é obrigatório')
  }

  return (
    <AdminLayout
      title="Produtos"
      actives={['products']}
      breadcrumb={breadcrumb}
    >
      <Form onSubmit={onSubmit} validations={validations}>
        <InputText
          label="Nome do produto"
          name="name"
          placeholder="Nome do produto"
        ></InputText>
        <input type="submit" value="Enviar" />
      </Form>
    </AdminLayout>
  )
}

export default Edit
