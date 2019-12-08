import settings from '@/settings.js'

const util = {
  getComputedStyle(el, property) {
    const p = window.getComputedStyle(el, null).getPropertyValue(property)
    if (p.indexOf('px') > 0) {
      return parseFloat(p)
    }
    return p
  },
  fetchBooks(store, query) {
    const itemsPerPage = settings.itemsPerPage
    const pageid = query.page ? parseInt(query.page) : 1
    const filter = ''
    const skip = (pageid - 1) * itemsPerPage
    const first = itemsPerPage

    return store.dispatch('book/fetchBooks', {
      filter,
      skip,
      first
    })
  }
}

export default util
