import Store from '@lesnock/simple-store'

const TableStore = new Store({})

TableStore.add('currentPage', 1)
TableStore.add('totalPages', 1)
TableStore.add('limit', 2)
TableStore.add('sort', 'id')
TableStore.add('order', 'asc')
TableStore.add('isLoading', false)
TableStore.add('fieldsearchs', {})
TableStore.add('search', null)

export default TableStore
