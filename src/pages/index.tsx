import { PrivateRoute } from '../contexts/AuthContext'

// Components
import Footer from '../components/Footer'
import PageContent from '../components/PageContent'
import Navbar, { NavbarItem } from '../components/Navbar'
import ControlSidebar from '../components/ControlSidebar'
import { BreadcrumbItem } from '../components/Breadcrumb'
import Sidebar, { SidebarItem } from '../components/Sidebar'
import { Card, CardText, CardButton } from '../components/Card'

// Types
type HomeProps = {
  menu: SidebarItem[]
  navbar: NavbarItem[]
  breadcrumb: BreadcrumbItem[]
}

export default function Home({ menu, navbar, breadcrumb }: HomeProps) {
  return (
    <PrivateRoute>
      <div className="wrapper">
        <Navbar items={navbar} />
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

export function getStaticProps() {
  // Breadcrumb ===============================
  const breadcrumb: BreadcrumbItem[] = [
    { name: 'Home', link: '/' },
    { name: 'Categorias', link: '/' },
    { name: 'Produtos', link: '/produtos', active: true }
  ]

  // Menu ======================================
  const menu: SidebarItem[] = [
    {
      name: 'Produtos',
      icon: 'fas fa-box',
      active: true,
      hasTreeView: true,
      subitems: [
        {
          name: 'Cadastro',
          icon: 'fas fa-box',
          link: '/produtos',
          active: true,
          hasTreeView: false
        },
        {
          name: 'Categorias',
          icon: 'fas fa-list',
          link: '/produtos',
          active: false,
          hasTreeView: false
        }
      ]
    },
    {
      name: 'Entregas',
      icon: 'fas fa-box',
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
      active: false,
      hasTreeView: true,
      subitems: [
        {
          name: 'Usuários',
          icon: 'fas fa-user',
          link: '/usuarios',
          active: false,
          hasTreeView: false
        }
      ]
    }
  ]

  // Navbar ======================================
  const navbar: NavbarItem[] = [
    { name: 'Home', link: '/' },
    { name: 'Alertas', link: '/alertas' }
  ]

  return {
    props: { menu, navbar, breadcrumb }
  }
}
