import { PrivateRoute } from '../contexts/AuthContext'

// Components
import { Card, CardText, CardButton } from '../components/Card'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import PageContent from '../components/PageContent'

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
            <Card title="Novo Card" type="primary" outline>
              <CardText>Meu novo card</CardText>
              <CardButton href="/login">Entendi</CardButton>
            </Card>
          </div>
        </PageContent>
      </div>
    </PrivateRoute>
  )
}
