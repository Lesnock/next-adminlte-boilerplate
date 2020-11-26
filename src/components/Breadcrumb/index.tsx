import Link from 'next/link'

export type BreadcrumbItem = {
  name: string
  link?: string
  active?: boolean
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <ol className="breadcrumb float-sm-right">
      {items.map((item, index) => {
        if (item.active) {
          return <ActiveItem name={item.name} key={index} />
        }

        return <LinkItem name={item.name} link={item.link} key={index} />
      })}
    </ol>
  )
}

/**
 * Render active item in breadcrumb
 */
function ActiveItem({ name }: BreadcrumbItem) {
  return <li className={`breadcrumb-item active`}>{name}</li>
}

/**
 * Render non active item in breadcrumb (has link)
 */
function LinkItem({ name, link }: BreadcrumbItem) {
  return (
    <li className={`breadcrumb-item`}>
      <Link href={link || '#'}>
        <a>{name}</a>
      </Link>
    </li>
  )
}
