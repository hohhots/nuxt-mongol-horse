import _ from 'lodash'

import { getPage } from '@/graphql/Page'
import { getBook, newBook, updateBook, getBooks } from '@/graphql/Book'

export const state = () => ({
  // current page display books
  BooksID: [],
  // all books count with current filter
  TotalBooks: 0,
  // current display book and page id
  BookId: '',
  PageId: '',
  // {filter:{0: {book}}}
  BooksIDCache: {},
  // global books and page local cache
  // id: book
  BooksCache: {},
  // id: page
  PagesCache: {},

  // model for new book and page
  newBook: {
    title: '',
    author: '',
    publishedAt: '',
    preview: ''
  },
  newPage: {
    pageNum: '',
    content: ''
  }
})

export const mutations = {
  SET_PAGE(state, page) {
    page.pageNum = page.pageNum + ''
    state.PagesCache[page.id] = page
  },
  SET_PAGEID(state, pageid) {
    state.PageId = pageid
  },
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
  async fetchPage({ state, commit, getters, dispatch }, pageid) {
    if (!getters.getBook) {
      await dispatch('fetchBook', state.BookId)
    }
    const book = getters.getBook
    pageid = book.pages[pageid - 1].id
    commit('SET_PAGEID', pageid)

    if (state.PagesCache[pageid]) {
      return
    }

    console.log('fetchPage')
    const apollo = this.app.apolloProvider.defaultClient
    await apollo
      .query({
        query: getPage,
        variables: {
          pageId: pageid
        }
      })
      .then(({ data }) => {
        commit('SET_PAGE', data.page)
      })
      .catch(e => console.log(e))
  },

  async fetchBook({ state, commit }, bookid) {
    if (!bookid) {
      alert('Need book id for get book')
      return
    }

    commit('SET_BOOKID', bookid)

    const book = state.BooksCache[bookid]
    // because fetchBook just for get more information, like all pages
    if (book && book.pages) {
      console.log('Book cache exist')
      return
    }

    console.log('fetchBook')
    const apollo = this.app.apolloProvider.defaultClient
    await apollo
      .query({
        query: getBook,
        variables: {
          bookId: bookid
        }
      })
      .then(({ data }) => {
        commit('SET_BOOK', data.book)
      })
      .catch(e => console.log(e))
  },

  async newBook({ rootState, commit }, book) {
    const apollo = this.app.apolloProvider.defaultClient

    await apollo
      .mutate({
        mutation: newBook,
        variables: {
          title: book.title,
          author: book.author,
          publishedAt: book.publishedAt,
          preview: book.preview
        }
      })
      .then(({ data }) => {
        alert('OK, new book is created!')
        commit('ADD_NEWBOOK', data.newBook)
      })
      .catch(e => {
        throw e
      })
  },

  async updateBook({ state, commit }, book) {
    const apollo = this.app.apolloProvider.defaultClient

    await apollo
      .mutate({
        mutation: updateBook,
        variables: {
          bookId: book.id,
          title: book.title,
          author: book.author,
          publishedAt: book.publishedAt,
          preview: book.preview
        }
      })
      .then(({ data }) => {
        alert('OK, updated !')
        commit('UPDATE_BOOK', data.updateBook)
      })
      .catch(e => {
        throw e
      })
  },

  async fetchBooks({ state, commit }, filters) {
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
    const apollo = this.app.apolloProvider.defaultClient
    await apollo
      .query({
        query: getBooks,
        variables: {
          filter: filters.filter,
          skip: filters.skip,
          first: filters.first
        }
      })
      .then(({ data }) => {
        const booksid = {
          booksList: data.bookList,
          filter: filters.filter,
          skip: filters.skip
        }
        commit('SET_BOOKS_PREVIEW', booksid)
      })
      .catch(e => console.log(e))
  }
}

export const getters = {
  getPage(state, getters, rootState, rootGetters) {
    // console.log(
    //   'getPage - ',
    //   state.PagesCache,
    //   state.PageId,
    //   state.PagesCache[state.PageId]
    // )
    return state.PagesCache[state.PageId]
  },
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
