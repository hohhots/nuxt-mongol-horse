import _ from 'lodash'

import getPage from '@/graphql/Page'
import getBook from '@/graphql/Book'
import getBooks from '@/graphql/Books'

export const state = () => ({
  // current page display books
  BooksID: [],
  // need to reference default pages value.
  Book: { pages: [] },
  // current display book and page id
  BookId: '',
  PageId: '',
  // global books and page local cache
  BooksCache: [],
  pagesCache: [],

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
    if (page) {
      // state.Book = book
    }
  },
  SET_BOOKID(state, bookid) {
    state.BookId = bookid
  },
  SET_BOOK(state, book) {
    // only for add or update book property
    const books = _.remove(state.BooksCache, function(n) {
      return n.id !== book.id
    })
    books.push(book)
    state.BooksCache = books
  },
  SET_BOOKS_PREVIEW(state, Books) {
    state.BooksID = []
    for (let i = 0; i < Books.length; i++) {
      const book = Books[i]
      if (!existBookCache(state.BooksCache, book.id)) {
        state.BooksCache.push(book)
      }
      state.BooksID.push(book.id)
    }
  }
}

export const actions = {
  async fetchPage({ state, commit }, pageid) {
    if (!pageid) {
      alert('Need page id for get book')
      return
    }
    const apollo = this.app.apolloProvider.defaultClient
    const { data } = await apollo.query({
      query: getPage,
      variables: {
        pageId: pageid
      }
    })
    commit('SET_PAGE', data.page)
  },

  async fetchBook({ state, commit }, bookid) {
    if (!bookid) {
      alert('Need book id for get book')
      return
    }

    commit('SET_BOOKID', bookid)

    const book = existBookCache(state.BooksCache, bookid)
    // because fetchBook just for get more information, like all pages
    if (book.pages) {
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
    return state.BooksID.length
  },
  getPage(state) {
    return (pageid, editExistingPage) => {
      if (!editExistingPage) {
        return state.newPage
      }
      return state.Book.pages[pageid - 1]
    }
  },
  getBook(state) {
    const cache = state.BooksCache
    for (let i = 0; i < cache.length; i++) {
      if (cache[i].id === state.BookId) {
        return cache[i]
      }
    }
  },
  getBooks(state) {
    const books = []
    const cache = state.BooksCache
    for (let i = 0; i < state.BooksID.length; i++) {
      const bookid = state.BooksID[i]
      for (let i = 0; i < cache.length; i++) {
        const book = cache[i]
        if (book.id === bookid) {
          books.push(book)
        }
      }
    }
    return books
  }
}

function existBookCache(cache, bookid) {
  let exist = false
  for (let i = 0; i < cache.length; i++) {
    const book = cache[i]
    if (book.id === bookid) {
      exist = book
    }
  }
  return exist
}
