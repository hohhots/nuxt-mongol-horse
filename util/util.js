import settings from '@/settings.js'

const util = {
  getComputedStyle(el, property) {
    const p = window.getComputedStyle(el, null).getPropertyValue(property)
    if (p.indexOf('px') > 0) {
      return parseFloat(p)
    }
    return p
  },
  async fetchBooks(store, query) {
    const itemsPerPage = settings.itemsPerPage
    const pageid = query.page ? parseInt(query.page) : 1
    const filter = ''
    const skip = (pageid - 1) * itemsPerPage
    const first = itemsPerPage

    const books = await store.dispatch('books/fetchBooks', {
      filter,
      skip,
      first
    })
    return books
  }
}

export default util
