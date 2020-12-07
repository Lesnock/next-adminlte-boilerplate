import React from 'react'
import Link from 'next/link'
import AdminLayout from 'layouts/admin'

const NotFound = () => {
  return (
    <AdminLayout
      title="404 Não encontrado"
      actives={['products']}
      breadcrumb={[]}
    >
      <div className="error-page">
        <h2 className="headline text-warning"> 404</h2>
        <div className="error-content">
          <h3>
            <i className="fas fa-exclamation-triangle text-warning" /> Oops!
            Página não encontrada.
          </h3>
          <p>
            Nós não encontramos a página que você estava procurando. Você pode{' '}
            <Link href="/">
              <a>retornar para o início.</a>
            </Link>
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}

export default NotFound
