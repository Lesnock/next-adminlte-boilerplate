import Link from 'next/link'
import { ReactProps } from 'types'

type CardProps = {
  title: string
  type?: string
  outline?: boolean
}

export function Card({
  title,
  type,
  outline = false,
  children
}: ReactProps & CardProps) {
  return (
    <div
      className={`card
        ${type ? 'card-' + type : ''}
        ${outline ? 'card-outline' : null}
      `}
    >
      <div className="card-header">
        <h5 className="m-0">{title}</h5>
      </div>
      <div className="card-body">{children}</div>
    </div>
  )
}

export function CardText({ children }: ReactProps) {
  return <p className="card-text">{children}</p>
}

type CardButtonProps = {
  href?: string
  type?: string
}

export function CardButton({
  children,
  href = '#',
  type = 'primary'
}: ReactProps & CardButtonProps) {
  return (
    <a href={href} className={`btn btn-${type}`}>
      {children}
    </a>
  )
}

export function CardLink({
  children,
  href = '#'
}: ReactProps & CardButtonProps) {
  return (
    <Link href={href}>
      <a className="card-link">{children}</a>
    </Link>
  )
}
