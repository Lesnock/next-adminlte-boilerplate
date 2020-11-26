import styles from './Styles.module.css'

type LoadingProps = {
  type?: string
}

export default function Loading({ type = 'primary' }: LoadingProps) {
  return (
    <div className={styles.loading}>
      <div className={`spinner-border text-${type}`} role="status">
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  )
}
