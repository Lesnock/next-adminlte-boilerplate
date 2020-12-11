import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import Sidebar from 'components/Sidebar'
import PageContent from 'components/PageContent'
import { PrivateRoute } from 'contexts/AuthContext'
import ControlSidebar from 'components/ControlSidebar'
import { BreadcrumbItem } from 'components/Breadcrumb'

import { ReactProps } from 'types'
import tableStore from 'stores/TableStore'

// Types
type AdminLayoutProps = {
  title: string
  actives: string[]
  breadcrumb: BreadcrumbItem[]
}

export default function AdminLayout({
  title,
  actives,
  breadcrumb,
  children
}: AdminLayoutProps & ReactProps) {
  const router = useRouter()

  useEffect(() => {
    updateTableStoreByQuery()
  })

  function updateTableStoreByQuery() {
    if (router.query.page) {
      tableStore.update('currentPage', Number(router.query.page))
    }

    if (router.query.sort) {
      tableStore.update('sort', router.query.sort)
    }

    if (router.query.order) {
      tableStore.update('order', router.query.order)
    }

    if (router.query.search) {
      tableStore.update('search', router.query.search)
    }
  }

  return (
    <PrivateRoute>
      <div className="wrapper">
        <Navbar withSearch={false} />
        <Sidebar actives={actives} />

        <PageContent title={title} breadcrumb={breadcrumb}>
          {children}
        </PageContent>

        <ControlSidebar />

        <Footer />
      </div>
    </PrivateRoute>
  )
}
