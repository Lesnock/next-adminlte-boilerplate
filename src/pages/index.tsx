import { PrivateRoute } from '../contexts/AuthContext'

// Components
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import PageContent from '../components/PageContent'
import ControlSidebar from '../components/ControlSidebar'
import { Card, CardText, CardButton } from '../components/Card'

export default function Home() {
  return (
    <PrivateRoute>
      <div className="wrapper">
        <Navbar withSearch={false} />
        <Sidebar actives={['home']} />

        <PageContent title="Início">
          <div className="col-lg-6">
            <Card title="Produtos" type="primary" outline>
              <CardText>Todos os produtos incluídos no sistema.</CardText>
              <CardButton href="/produtos">Ver todos</CardButton>
            </Card>
          </div>
        </PageContent>

        <ControlSidebar />

        <Footer />
      </div>
    </PrivateRoute>
  )
}
