import { PrivateRoute } from '../contexts/AuthContext'

// Components
import { Card, CardText, CardButton } from '../components/Card'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Sidebar, { SidebarItem } from '../components/Sidebar'
import PageContent from '../components/PageContent'
import ControlSidebar from '../components/ControlSidebar'

export default function Home() {
  // Breadcrumb ===============================
  const breadcrumb = [
    { name: 'Home', link: '/' },
    { name: 'Categorias', link: '/' },
    { name: 'Produtos', link: '/produtos', active: true }
  ]

  const menu: SidebarItem[] = [
    {
      name: 'Produtos',
      icon: 'fas fa-box',
      link: '#',
      active: true,
      hasTreeView: true,
      subitems: [
        {
          name: 'Cadastro',
          icon: 'fas fa-box',
          link: '/produtos',
          active: true,
          hasTreeView: false
        }
      ]
    },
    {
      name: 'Entregas',
      icon: 'fas fa-box',
      link: '#',
      active: false,
      hasTreeView: true,
      subitems: [
        {
          name: 'Cadastro',
          icon: 'fas fa-box',
          link: '/entregas',
          active: false,
          hasTreeView: false
        }
      ]
    },
    {
      name: 'Configurações',
      icon: 'fas fa-cog',
      link: '/configuracoes',
      active: false,
      hasTreeView: false
    }
  ]

  return (
    <PrivateRoute>
      <div className="wrapper">
        <Navbar />
        <Sidebar items={menu} />

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
