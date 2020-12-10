import { GetServerSidePropsContext } from 'next'
import { toast } from 'react-toastify'
import { number, string } from 'validations'

import { apiFromServer } from 'services/api'

import AdminLayout from 'layouts/admin'

import Row from 'components/Row'
import Form from 'components/Form'
import Input from 'components/Input'
import Select from 'components/Select'
import { Card } from 'components/Card'
import Submit from 'components/Submit'
import { BreadcrumbItem } from 'components/Breadcrumb'

const breadcrumb: BreadcrumbItem[] = [
  { name: 'Home', link: '/' },
  { name: 'Produtos', link: '/produtos' },
  { name: 'Editar', active: true }
]

const validations = {
  name: string('nome').nullable().required(),
  ncm: string('ncm').nullable(),
  protheus_cod: string('protheus_cod').nullable(),
  quantity: number('quantidade').min(0).nullable().required(),
  min_quantity: number('estoque mínimo').min(0).nullable().required(),
  max_quantity: number('estoque máximo').nullable(),
  unity: string('unidade de medida').nullable().required()
}

const Edit = ({ product, error }) => {
  if (error) {
    toast.error('Erro: ' + error)
  }

  const onSubmit = (values) => {
    console.log('onSubmit')
  }

  return (
    <AdminLayout title="" actives={['products']} breadcrumb={breadcrumb}>
      <Form onSubmit={onSubmit} validations={validations} initialData={product}>
        <div className="col-md-8">
          <Card title="Propriedades" type="primary">
            <Row>
              <Input label="Nome" name="name"></Input>

              <Input label="NCM" name="ncm" col={3}></Input>

              <Input label="Cód. Protheus" name="protheus_cod" col={3}></Input>

              <Select
                label="Unidade de medida"
                name="unity"
                options={[
                  { title: 'Unidades', value: 'Unidades' },
                  { title: 'Litros', value: 'Litros' }
                ]}
              />
            </Row>
          </Card>
          <Card title="Estoque" type="primary">
            <Row>
              <Input
                label="Quantidade em estoque"
                type="number"
                name="quantity"
                col={4}
              ></Input>

              <Input
                label="Estoque mínimo"
                type="number"
                name="min_quantity"
                col={4}
              ></Input>

              <Input
                label="Estoque máximo"
                type="number"
                name="max_quantity"
                col={4}
              ></Input>
            </Row>
          </Card>
          <Submit>Salvar</Submit>
        </div>
      </Form>
    </AdminLayout>
  )
}

// Get the specific product
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query

  try {
    const { data: product } = await apiFromServer(context).get(
      '/products/' + id
    )

    return { props: { product } }
  } catch (error) {
    return { props: { error: error.message } }
  }
}

export default Edit
