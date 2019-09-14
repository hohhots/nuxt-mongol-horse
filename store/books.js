import getBook from '@/graphql/Book'
import getBooks from '@/graphql/Books'

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
    if (!bookid) {
      alert('Need book id for get book')
      return
    }
    const apollo = this.app.apolloProvider.defaultClient
    const { data } = await apollo.query({
      query: getBook,
      variables: {
        bookId: bookid
      }
    })

    commit('SET_BOOK', data.book)
  },

  async fetchBooks({ commit }, filters) {
    const apollo = this.app.apolloProvider.defaultClient
    const { data } = await apollo.query({
      query: getBooks,
      variables: {
        filter: filters.filter,
        skip: filters.skip,
        first: filters.first
      }
    })

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
