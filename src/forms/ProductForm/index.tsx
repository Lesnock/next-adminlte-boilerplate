import { AnySchema } from 'yup'

import Row from 'components/Row'
import Form from 'components/Form'
import Input from 'components/Input'
import Select from 'components/Select'
import { Card } from 'components/Card'
import Submit from 'components/Submit'
import Loading from 'components/Loading'
import InputMoney from 'components/InputMoney'

type Props = {
  onSubmit: (values: { [key: string]: any }) => void //eslint-disable-line
  validations?: { [key: string]: AnySchema }
  isLoading?: boolean
  initialData?: { [key: string]: any } //eslint-disable-line
}

const ProductForm = ({
  onSubmit,
  validations = {},
  isLoading = false,
  initialData
}: Props) => {
  return (
    <Form
      onSubmit={onSubmit}
      validations={validations}
      initialData={initialData}
    >
      {isLoading && <Loading />}
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

          <InputMoney
            label="Último preço pago (R$)"
            name="last_price"
            col={6}
          ></InputMoney>
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
    </Form>
  )
}

export default ProductForm
