export const state = () => ({
  booksPreview: [],
  totalBooks: 0,
  // need to reference default pages value.
  book: { pages: [] },
  newBook: {
    title: '',
    author: '',
    publishedAt: '',
    preview: ''
  },
  newPage: {
    id: '',
    photo: '',
    pageNum: '',
    content: ''
  }
})

export const mutations = {
  SET_BOOK(state, book) {
    if (book) {
      state.book = book
    }
  },
  SET_BOOKS_PREVIEW(state, booksPreview) {
    state.booksPreview = booksPreview
  },
  SET_TOTAL_BOOKS(state, totalBooks) {
    state.totalBooks = totalBooks
  }
}

export const actions = {
  async fetchBook({ state, commit }, bookid) {
    const query = `{
      book( bookId: "${bookid}") {
        id
        title
        author
        publishedAt
        preview
        pages{
          id
          pageNum
          content
          postedBy{
            name
          }
        }
        postedBy{
          name
        }
      }
    }`

    const { data } = await this.$axios.$post('/', { query })
    commit('SET_BOOK', data.book)
  },
  async fetchBooksPreview({ commit }, filters) {
    const sf = `skip:${filters.skip}, first:${
      filters.first
    }, orderBy:createdAt_DESC`
    const bookList = filters.filter
      ? `(filter:"${filters.filter}", ${sf})`
      : `(${sf})`
    const query = `{
      bookList${bookList} {
        books {
          id
          title
          preview
        }
        count
      }
    }`

    const { data } = await this.$axios.$post('/', { query })

    commit('SET_BOOKS_PREVIEW', data.bookList.books)
    commit('SET_TOTAL_BOOKS', data.bookList.count)
  }
}

export const getters = {
  getPage(state) {
    return (pageid, editExistingPage) => {
      if (!editExistingPage) {
        return state.newPage
      }
      return state.book.pages[pageid - 1]
    }
  }
}
