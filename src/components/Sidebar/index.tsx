import { useEffect } from 'react'
import Link from 'next/link'

type SidebarProps = {
  actives: string[]
}

export type SidebarItem = {
  name: string
  slug: string
  icon: string
  link?: string
  hasTreeView: boolean
  subitems?: SidebarItem[]
}

// Menu ======================================
const menu: SidebarItem[] = [
  {
    name: 'Início',
    slug: 'home',
    icon: 'fas fa-home',
    link: '/',
    hasTreeView: false
  },
  {
    name: 'Produtos',
    slug: 'products',
    icon: 'fas fa-box',
    link: '/produtos',
    hasTreeView: false
  },
  {
    name: 'Entregas',
    slug: 'withdraws',
    icon: 'fas fa-hands-helping',
    hasTreeView: false
  },
  {
    name: 'Configurações',
    icon: 'fas fa-cog',
    slug: 'config',
    hasTreeView: true,
    subitems: [
      {
        name: 'Usuários',
        slug: 'config-users',
        icon: 'fas fa-user',
        link: '/usuarios',
        hasTreeView: false
      }
    ]
  }
]

export default function Sidebar({ actives }: SidebarProps) {
  useEffect(() => {
    // eslint-disable-next-line
    const trees: any = $('[data-widget="treeview"]')
    trees.Treeview('init')
  }, [])

  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="/" className="brand-link">
          <img
            src="/images/logo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle"
            style={{ opacity: 0.8 }}
          />
          <span className="brand-text font-weight-light">Almoxarifado</span>
        </a>

        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {menu.map((item, index) => (
                <MenuItem key={index} item={item} actives={actives} />
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}

function MenuItem({ item, actives }: { item: SidebarItem; actives: string[] }) {
  return (
    <li
      className={`nav-item
        ${item.hasTreeView && 'has-treeview'}
        ${item.hasTreeView && actives.includes(item.slug) && 'menu-open'}
        `}
    >
      <Link href={item.link || '#'}>
        <a className={`nav-link ${actives.includes(item.slug) && 'active'}`}>
          <i className={`nav-icon ${item.icon}`}></i>
          <p>
            {item.name}
            {item.hasTreeView && <i className="right fas fa-angle-left"></i>}
          </p>
        </a>
      </Link>
      {item.subitems && item.subitems.length > 0 && (
        <ul className="nav nav-treeview">
          {item.subitems?.map((subitem, index) => (
            <MenuItem key={index} item={subitem} actives={actives} />
          ))}
        </ul>
      )}
    </li>
  )
}
