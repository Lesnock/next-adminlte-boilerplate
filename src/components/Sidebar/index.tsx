import { useEffect } from 'react'
import Link from 'next/link'

type SidebaProps = {
  items: SidebarItem[]
}

export type SidebarItem = {
  name: string
  icon: string
  link?: string
  active: boolean
  hasTreeView: boolean
  subitems?: SidebarItem[]
}

export default function Sidebar({ items }: SidebaProps) {
  useEffect(() => {
    // eslint-disable-next-line
    const trees: any = $('[data-widget="treeview"]')
    trees.Treeview('init')
  }, [])

  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="index3.html" className="brand-link">
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
              {items &&
                items.map((item, index) => (
                  <MenuItem key={index} item={item} />
                ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}

function MenuItem({ item }: { item: SidebarItem }) {
  return (
    <li
      className={`nav-item
        ${item.hasTreeView && 'has-treeview'}
        ${item.hasTreeView && item.active && 'menu-open'}
        `}
    >
      <Link href={item.link || '#'}>
        <a className={`nav-link ${item.active && 'active'}`}>
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
            <MenuItem key={index} item={subitem} />
          ))}
        </ul>
      )}
    </li>
  )
}
