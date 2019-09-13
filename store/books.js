export const state = () => ({
  Books: [],
  // need to reference default pages value.
  Book: { pages: [] },
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
      state.Book = book
    }
  },
  SET_BOOKS_PREVIEW(state, Books) {
    state.Books = Books
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
          imageType
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
  async fetchBooks({ commit }, filters) {
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
  }
}

export const getters = {
  getBooksNum(state) {
    return state.Books.length
  },
  getPage(state) {
    return (pageid, editExistingPage) => {
      if (!editExistingPage) {
        return state.newPage
      }
      return state.Book.pages[pageid - 1]
    }
  }
}
