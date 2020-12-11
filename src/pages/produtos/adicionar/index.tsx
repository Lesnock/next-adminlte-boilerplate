import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import { number, string } from 'validations'

import AdminLayout from 'layouts/admin'

import { delay } from 'helpers'
import api from 'services/api'

import Alert from 'components/Alert'
import ProductForm from 'forms/ProductForm'
import { BreadcrumbItem } from 'components/Breadcrumb'

const breadcrumb: BreadcrumbItem[] = [
  { name: 'Home', link: '/' },
  { name: 'Produtos', link: '/produtos' },
  { name: 'Adicionar', active: true }
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

const ProductAdd = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    async function start() {
      delay(500)
      setIsLoading(false)
    }

    start()
  }, [])

  async function save(fields) {
    setIsLoading(true)
    setFormError(null)

    await delay(500)

    try {
      await api.post(`/products`, fields)
      toast.success(`Produto salvo com sucesso`)

      router.push('/produtos')
    } catch (error) {
      setFormError(error.message)
    }

    setIsLoading(false)
  }

  return (
    <AdminLayout
      title="Adicionar produto"
      actives={['products']}
      breadcrumb={breadcrumb}
    >
      <div className="col-md-8">
        {formError && <Alert message={formError!} />}
        <ProductForm
          onSubmit={save}
          validations={validations}
          isLoading={isLoading}
        />
      </div>
    </AdminLayout>
  )
}

export default ProductAdd
