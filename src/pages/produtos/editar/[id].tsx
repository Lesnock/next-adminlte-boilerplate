import { number, string } from 'validations'

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

const Edit = () => {
  const onSubmit = (values) => {
    console.log('enviou', values)
  }

  const validations = {
    name: string('nome').nullable().required(),
    ncm: string('ncm').nullable(),
    protheus_cod: string('protheus_cod').nullable(),
    quantity: number('quantidade').min(0).nullable().required(),
    unity: string('unidade de medida').nullable().required()
  }

  const initialData = {
    name: 'Caneta Azul',
    quantity: 10,
    min_quantity: 5,
    max_quantity: 20,
    unity: 1
  }

  return (
    <AdminLayout title="" actives={['products']} breadcrumb={breadcrumb}>
      <Form
        onSubmit={onSubmit}
        validations={validations}
        initialData={initialData}
      >
        <div className="col-md-12">
          <Card title="Cadastro de produto" type="primary">
            <Row>
              <Input label="Nome" name="name"></Input>

              <Input label="NCM" name="ncm"></Input>

              <Input label="Cód. Protheus" name="protheus_cod"></Input>

              <Input label="Quantidade" type="number" name="quantity"></Input>

              <Input
                label="Estoque mínimo"
                type="number"
                name="min_quantity"
              ></Input>

              <Input
                label="Estoque máximo"
                type="number"
                name="max_quantity"
              ></Input>

              <Select
                label="Unidade de medida"
                name="unity"
                options={[
                  { title: 'Unidades', value: 'Unidades' },
                  { title: 'Litros', value: 'Litros' }
                ]}
              />
            </Row>
            <Submit>Enviar</Submit>
          </Card>
        </div>
      </Form>
    </AdminLayout>
  )
}

export default Edit
