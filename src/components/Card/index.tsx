import Link from 'next/link'
import { ReactProps } from 'types'

type CardProps = {
  title: string
  type?: string
  outline?: boolean
  closeable?: boolean
}

export function Card({
  title,
  type,
  outline = false,
  closeable = true,
  children
}: ReactProps & CardProps) {
  return (
    <div
      className={`card
        ${type ? 'card-' + type : ''}
        ${outline ? 'card-outline' : null}
      `}
      style={{ width: '100%' }}
    >
      <div className="card-header">
        <h5 className="card-title">{title}</h5>

        {closeable && (
          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="collapse"
            >
              <i className="fas fa-minus"></i>
            </button>
          </div>
        )}
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

export function CardFooter({ children }) {
  return <div className="card-footer">{children}</div>
}
