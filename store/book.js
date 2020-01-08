import _ from 'lodash'

import BookService from '@/services/BookService.js'

export const state = () => ({
  // current page display books
  BooksID: [],
  // all books count with current filter
  TotalBooks: 0,
  // current display book
  BookId: '',
  // {filter:{0: {book}}}
  BooksIDCache: {},
  // global books and page local cache
  // id: book
  BooksCache: {},

  // model for new book
  newBook: {
    title: '',
    author: '',
    publishedAt: '',
    preview: ''
  }
})

export const mutations = {
  SET_BOOKID(state, bookid) {
    state.BookId = bookid
  },
  SET_BOOKSID(state, booksid) {
    state.BooksID = booksid
  },
  SET_TOTALBOOKS(state, totalBooks) {
    state.TotalBooks = totalBooks
  },
  SET_BOOK(state, book) {
    // only for add or update book property
    const cbook = state.BooksCache[book.id]

    if (cbook) {
      state.BooksCache[book.id] = _.assign({}, cbook, book)
    } else {
      state.BooksCache[book.id] = book
    }
  },
  ADD_NEWBOOK(state, newbook) {
    state.BooksCache[newbook.id] = newbook

    state.BooksID = []
    state.BooksIDCache = {}
    state.BookId = newbook.id

    this.app.apolloProvider.defaultClient.cache.data.data = {}
  },
  UPDATE_BOOK(state, book) {
    const cbook = state.BooksCache[book.id]

    _.assign(cbook, book)
  },
  SET_BOOKS_PREVIEW(state, booksid) {
    const books = booksid.booksList.books
    const filter = booksid.filter
    const skip = booksid.skip || 0
    const count = booksid.booksList.count

    state.TotalBooks = count

    state.BooksID = []
    _.each(books, book => {
      const cacheBook = state.BooksCache[book.id] || {}

      state.BooksCache[book.id] = _.assign({}, cacheBook, book)
      state.BooksID.push(book.id)

      const pageState = this.state.page
      const pages = book.pages || []
      _.each(pages, page => {
        const cachePage = pageState.PagesCache[page.id] || {}
        pageState.PagesCache[page.id] = _.assign({}, cachePage, page)
      })
    })
    if (!state.BooksIDCache[filter]) {
      state.BooksIDCache[filter] = {}
    }

    state.BooksIDCache[filter][skip] = state.BooksID
    state.BooksIDCache[filter].total = count
  }
}

export const actions = {
  fetchBook({ state, commit }, bookid) {
    if (bookid) {
      commit('SET_BOOKID', bookid)
    } else {
      bookid = state.BookId
    }

    const book = state.BooksCache[bookid]
    // because fetchBook just for get more information, like all pages
    if (book && book.pages && book.author) {
      return
    }

    console.log('fetchBook')
    return BookService.getBook(this, bookid).then(({ data }) => {
      commit('SET_BOOK', data.book)
    })
  },

  updateBook({ commit }, book) {
    return BookService.updateBook(this, book).then(({ data }) => {
      commit('UPDATE_BOOK', data.updateBook)
    })
  },

  newBook({ commit }, book) {
    return BookService.addNewBook(this, book).then(({ data }) => {
      commit('ADD_NEWBOOK', data.newBook)
    })
  },

  fetchBooks({ state, commit }, filters) {
    const cachefilter = 'f' + (filters.filter || 'empty')
    const cacheskip = filters.skip || 0
    const booksId = state.BooksIDCache[cachefilter]
      ? state.BooksIDCache[cachefilter][cacheskip]
      : null
    if (booksId) {
      commit('SET_BOOKSID', booksId)
      commit('SET_TOTALBOOKS', state.BooksIDCache[cachefilter].total)
      return
    }

    console.log('fetchBooks')
    return BookService.getBooks(this, filters).then(({ data }) => {
      const bookList = data.bookList || data.bookFilterList
      commit('SET_BOOKS_PREVIEW', {
        booksList: bookList,
        filter: cachefilter,
        skip: filters.skip
      })
    })
  }
}

export const getters = {
  getBook(state) {
    return state.BooksCache[state.BookId] || {}
  },
  getBookPages(state) {
    const book = state.BooksCache[state.BookId]
    return book ? book.pages : []
  },
  getBooks(state) {
    const books = []
    for (let i = 0; i < state.BooksID.length; i++) {
      const book = state.BooksCache[state.BooksID[i]]
      books.push(book)
    }
    return books
  }
}
