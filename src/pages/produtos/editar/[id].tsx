import { useState } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import { number, string } from 'validations'
import { GetServerSidePropsContext } from 'next'

import { delay } from 'helpers'
import api, { apiFromServer } from 'services/api'

import AdminLayout from 'layouts/admin'

import Alert from 'components/Alert'
import ProductForm from 'forms/ProductForm'
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
  last_price: string('último preço pago').nullable(),
  quantity: number('quantidade').min(0).nullable().required(),
  min_quantity: number('estoque mínimo').min(0).nullable().required(),
  max_quantity: number('estoque máximo').nullable(),
  unity: string('unidade de medida').nullable().required()
}

const Edit = ({ product, error }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState(null)

  if (error) toast.error('Erro: ' + error)

  // Save Product
  async function save(fields) {
    setIsLoading(true)
    setFormError(null)

    await delay(500)

    try {
      await api.put(`/products/${product.id}`, fields)
      toast.success(`Produto salvo com sucesso`)

      router.push('/produtos')
    } catch (error) {
      setFormError(error.message)
    }

    setIsLoading(false)
  }

  return (
    <AdminLayout
      title="Editar produto"
      actives={['products']}
      breadcrumb={breadcrumb}
    >
      <div className="col-md-8">
        {formError && <Alert message={formError!} />}
        <ProductForm
          initialData={product}
          onSubmit={save}
          validations={validations}
          isLoading={isLoading}
        />
      </div>
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
