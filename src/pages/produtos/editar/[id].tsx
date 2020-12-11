import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import { number, string } from 'validations'

import { delay } from 'helpers'
import { Product } from 'types'
import api from 'services/api'

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

const Edit = () => {
  const router = useRouter()
  const [product, setProduct] = useState<Partial<Product>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState(null)

  // Get the product
  useEffect(() => {
    setIsLoading(true)

    async function getProduct() {
      await delay(500)

      const { id } = router.query

      try {
        const { data: product } = await api.get('/products/' + id)
        setProduct(product)
      } catch (error) {
        toast.error(error.message)
        router.push('/produtos')
      }

      setIsLoading(false)
    }

    getProduct()
  }, [router])

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

export default Edit
