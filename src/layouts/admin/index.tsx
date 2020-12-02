import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import PageContent from '../../components/PageContent'
import { PrivateRoute } from '../../contexts/AuthContext'
import ControlSidebar from '../../components/ControlSidebar'
import { BreadcrumbItem } from '../../components/Breadcrumb'

import { ReactProps } from '../../types'

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
  return (
    <PrivateRoute>
      <div className="wrapper">
        <Navbar withSearch={true} />
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
