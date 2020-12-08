import { number, string } from 'validations'

import AdminLayout from 'layouts/admin'

import Row from 'components/Row'
import Form from 'components/Form'
import Input from 'components/Input'
import { Card } from 'components/Card'
import Submit from 'components/Submit'
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
    name: string('nome').nullable().required(),
    quantity: number('quantidade').min(0).nullable().required()
  }

  return (
    <AdminLayout
      title="Produtos"
      actives={['products']}
      breadcrumb={breadcrumb}
    >
      <Form onSubmit={onSubmit} validations={validations}>
        <Card title="Cadastro" type="primary">
          <Row>
            <Input label="Nome" col={6} name="name"></Input>

            <Input
              label="Quantidade"
              type="number"
              col={2}
              name="quantity"
            ></Input>
          </Row>

          <Submit>Enviar</Submit>
        </Card>
      </Form>
    </AdminLayout>
  )
}

export default Edit
