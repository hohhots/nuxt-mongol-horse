import _ from 'lodash'

import getPage from '@/graphql/Page'
import { getBook, newBook, updateBook } from '@/graphql/Book'
import getBooks from '@/graphql/Books'

export const state = () => ({
  // current page display books
  BooksID: [],
  // all books count with current filter
  TotalBooks: 0,
  // current display book and page id
  BookId: '',
  PageId: '',
  // url: booksID array
  BooksIDCacke: {},
  // global books and page local cache
  BooksCache: [],
  PagesCache: [],

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
    const cpage = _.find(state.PagesCache, function(p) {
      return page.id === p.id
    })
    if (!cpage) {
      state.PagesCache.push(page)
    }
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
    const cbook = _.map(state.BooksCache, function(b) {
      if (b.id === book.id) {
        return _.assign(b, book)
      }
      return b
    })
    if (!cbook.length) {
      state.BooksCache.push(book)
    }
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
      if (!existBookCache(state.BooksCache, book.id)) {
        state.BooksCache.push(book)
      }
      state.BooksID.push(book.id)
    }
    if (!state.BooksIDCacke[filter]) {
      state.BooksIDCacke[filter] = {}
    }

    state.BooksIDCacke[filter][skip] = state.BooksID
    state.BooksIDCacke[filter].total = count
  }
}

export const actions = {
  async fetchPage({ state, commit, getters }, pageid) {
    if (!pageid) {
      alert('Need page id for get book')
      return
    }

    const book = getters.getBook
    pageid = book.pages[pageid - 1].id

    commit('SET_PAGEID', pageid)

    const cpage = _.find(state.PagesCache, function(p) {
      return pageid === p.id
    })
    if (cpage) {
      return cpage
    }

    console.log('fetchPage')
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

    console.log('fetchBook')
    const apollo = this.app.apolloProvider.defaultClient
    const { data } = await apollo.query({
      query: getBook,
      variables: {
        bookId: bookid
      }
    })

    commit('SET_BOOK', data.book)
  },

  async newBook({ rootState }, book) {
    // this.$apolloHelpers.onLogin(rootState.user.jwt)

    const apollo = this.app.apolloProvider.defaultClient

    const nbook = await apollo.mutate({
      mutation: newBook,
      variables: {
        title: book.title,
        author: book.author,
        publishedAt: book.publishedAt,
        preview: book.preview
      },
      headers: { Authorization: 'Bearer ' + rootState.user.jwt }
    })

    if (nbook.errors) {
      alert(nbook.errors[0].message)
    }
  },

  async updateBook({ state, commit }, book) {
    const apollo = this.app.apolloProvider.defaultClient
    const nbook = await apollo.mutate({
      mutation: updateBook,
      variables: {
        bookId: book.id,
        title: book.title,
        author: book.author,
        publishedAt: book.publishedAt,
        preview: book.preview
      }
    })

    if (nbook.errors) {
      alert(nbook.errors[0].message)
    }
  },

  async fetchBooks({ state, commit }, filters) {
    const cachefilter = filters.filter || 'empty'
    const cacheskip = filters.skip || 0
    const booksId = state.BooksIDCacke[cachefilter]
      ? state.BooksIDCacke[cachefilter][cacheskip]
      : null
    if (booksId) {
      commit('SET_BOOKSID', booksId)
      commit('SET_TOTALBOOKS', state.BooksIDCacke[cachefilter].total)
      return
    }

    console.log('fetchBooks')
    const apollo = this.app.apolloProvider.defaultClient
    const { data } = await apollo.query({
      query: getBooks,
      variables: {
        filter: filters.filter,
        skip: filters.skip,
        first: filters.first
      }
    })
    const booksid = {
      booksList: data.bookList,
      filter: filters.filter,
      skip: filters.skip
    }
    commit('SET_BOOKS_PREVIEW', booksid)
  }
}

export const getters = {
  getPage(state) {
    return _.find(state.PagesCache, function(page) {
      return state.PageId === page.id
    })
  },
  getBook(state) {
    return _.find(state.BooksCache, function(book) {
      return state.BookId === book.id
    })
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
  return _.find(cache, function(book) {
    return book.id === bookid
  })
}
