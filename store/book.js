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
    state.totalBooks = totalBooks
  },
  SET_BOOK(state, book) {
    // only for add or update book property
    const cbook = state.BooksCache[book.id]

    if (cbook) {
      _.assign(cbook, book)
    } else {
      state.BooksCache[book.id] = book
    }
  },
  SET_BOOK_PAGES(state, pages) {
    state.BooksCache[state.BookId].pages = pages
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
    const filter = booksid.filter || 'empty'
    const skip = booksid.skip || 0
    const count = booksid.booksList.count

    state.TotalBooks = count

    state.BooksID = []
    for (let i = 0; i < books.length; i++) {
      const book = books[i]
      if (!state.BooksCache[book.id]) {
        state.BooksCache[book.id] = book
      }
      state.BooksID.push(book.id)
    }
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
    if (book && book.pages) {
      return
    }

    console.log('fetchBook')
    return BookService.getBook(this, bookid).then(({ data }) => {
      commit('SET_BOOK', data.book)
    })
  },

  async updateBook({ commit }, book) {
    const err = await BookService.qlUpdateBook(this, book)
    if (err.statusCode) {
      return err
    } else {
      commit('UPDATE_BOOK', book)
    }
  },

  async newBook({ commit }, book) {
    const newbook = await BookService.qlNewBook(this, book)
    if (newbook.statusCode) {
      return newbook
    } else {
      commit('ADD_NEWBOOK', newbook)
    }
  },

  fetchBooks({ state, commit }, filters) {
    const cachefilter = filters.filter || 'empty'
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
      commit('SET_BOOKS_PREVIEW', {
        booksList: data.bookList,
        filter: filters.filter,
        skip: filters.skip
      })
    })
  }
}

export const getters = {
  getBook(state) {
    return state.BooksCache[state.BookId]
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
