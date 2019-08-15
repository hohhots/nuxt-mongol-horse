export const state = () => ({
  booksPreview: [],
  totalBooks: 0,
  book: {
    id: '',
    title: '',
    author: '',
    publishedAt: '',
    postedBy: '',
    preview: '',
    pages: []
  },
  newPage: {
    id: '',
    image: '',
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
    if (state.book.id === bookid) {
      return
    }
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
    const sf = `skip:${filters.skip}, first:${filters.first}`
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
    // console.log(query)

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
      return state.book.content[pageid - 1]
    }
  }
}
