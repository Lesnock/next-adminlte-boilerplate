import { PrivateRoute } from '../contexts/AuthContext'

// Components
import { Card, CardText, CardButton } from '../components/Card'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import PageContent from '../components/PageContent'
import ControlSidebar from '../components/ControlSidebar'

export default function Home() {
  // Breadcrumb ===============================
  const breadcrumb = [
    { name: 'Home', link: '/' },
    { name: 'Categorias', link: '/' },
    { name: 'Produtos', link: '/produtos', active: true }
  ]

  return (
    <PrivateRoute>
      <div className="wrapper">
        <Navbar />
        <Sidebar />

        <PageContent title="Produtos" breadcrumb={breadcrumb}>
          <div className="col-lg-6">
            <Card title="Produtos" type="primary" outline>
              <CardText>Produtos</CardText>
              <CardButton href="/login">Ver todos</CardButton>
            </Card>
          </div>
        </PageContent>

        <ControlSidebar />

        <Footer />
      </div>
    </PrivateRoute>
  )
}
