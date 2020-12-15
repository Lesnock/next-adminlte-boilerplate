// import { Container } from './styles';

import styles from './styles.module.css'

type Props = {
  label: string
}

const TableFilter = ({ label }: Props) => {
  return (
    <div className="table-filter float-left" style={{ marginRight: '10px' }}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className="form-control form-control-sm"
        style={{ width: '200px' }}
      >
        <option value="1">Todos</option>
        <option value="2">Ativos</option>
        <option value="2">Ativos</option>
      </select>
    </div>
  )
}

export default TableFilter
