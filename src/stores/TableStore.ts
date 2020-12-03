import Store from '@lesnock/simple-store'

const TableStore = new Store({})

TableStore.add('page', 1)
TableStore.add('totalPages', 1)
TableStore.add('limit', 1)
TableStore.add('sort', 'id')
TableStore.add('order', 'asc')

export default TableStore
