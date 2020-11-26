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
        <Navbar items={navbar} withSearch={true} />
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
    { name: 'Produtos', link: '/produtos', active: true }
  ]

  // Menu ======================================
  const menu: SidebarItem[] = [
    {
      name: 'Produtos',
      slug: 'products',
      icon: 'fas fa-box',
      active: true,
      hasTreeView: false
    },
    {
      name: 'Entregas',
      slug: 'withdraws',
      icon: 'fas fa-hands-helping',
      active: false,
      hasTreeView: false
    },
    {
      name: 'Configurações',
      icon: 'fas fa-cog',
      slug: 'config',
      active: false,
      hasTreeView: true,
      subitems: [
        {
          name: 'Usuários',
          slug: 'config-users',
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
