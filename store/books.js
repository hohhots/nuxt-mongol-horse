import _ from 'lodash'

import BookService from '@/services/BookService.js'

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
    state.PagesCache[page.id] = page
  },
  SET_PAGEID(state, pageid) {
    state.PageId = pageid
  },
  ADD_NEWPAGE(state, newpage) {
    state.PageId = newpage.id

    state.PagesCache[newpage.id] = newpage

    const pages = state.BooksCache[state.BookId].pages
    pages.push({
      id: newpage.id,
      pageNum: newpage.pageNum,
      __typename: 'Page'
    })
    state.BooksCache[state.BookId].pages = _.sortBy(pages, ['pageNum'])
  },
  UPDATE_PAGE(state, page) {
    const tp = { ...page }
    tp.pageNum = parseInt(tp.pageNum)
    _.assign(state.PagesCache[tp.id], tp)

    const pages = state.BooksCache[state.BookId].pages
    const upage = _.find(pages, { id: tp.id })
    upage.pageNum = tp.pageNum

    state.BooksCache[state.BookId].pages = _.sortBy(pages, ['pageNum'])
  },
  SET_PAGE_IMAGE_TYPE(state, imageType) {
    state.PagesCache[state.PageId].imageType = imageType.split('/')[1]
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
  async fetchPage({ error, state, commit, getters, dispatch }, pageid) {
    let book = getters.getBook
    if (!book) {
      const err = await dispatch('fetchBook', state.BookId)
      if (err) {
        return error(err)
      } else {
        book = getters.getBook
      }
    }
    pageid = book.pages[pageid - 1].id
    commit('SET_PAGEID', pageid)

    if (state.PagesCache[pageid]) {
      return
    }

    console.log('fetch page')
    const page = await BookService.qlPage(this, pageid)
    if (page.statusCode) {
      return page
    } else {
      commit('SET_PAGE', page)
    }
  },

  async updatePage({ state, commit }, page) {
    const err = await BookService.qlUpdatePage(this, page)
    if (err) {
      return err
    } else {
      commit('UPDATE_PAGE', page)
    }
  },

  async newPage({ state, commit, dispatch }, page) {
    const newpage = await BookService.qlNewPage(this, state.BookId, page)
    if (newpage.statusCode) {
      return newpage
    } else {
      commit('ADD_NEWPAGE', newpage)
    }
  },

  async fetchBook({ state, commit }, bookid) {
    if (!bookid) {
      alert('Need book id for get book')
      return
    }

    commit('SET_BOOKID', bookid)

    let book = state.BooksCache[bookid]
    // because fetchBook just for get more information, like all pages
    if (book && book.pages) {
      return
    }

    console.log('fetchBook')
    book = await BookService.qlBook(this, bookid)
    if (book.statusCode) {
      return book
    } else {
      commit('SET_BOOK', book)
    }
  },

  async updateBook({ state, commit }, book) {
    const err = await BookService.qlUpdateBook(this, book)
    if (err.statusCode) {
      return err
    } else {
      commit('UPDATE_BOOK', book)
    }
  },

  async newBook({ rootState, commit }, book) {
    const newbook = await BookService.qlNewBook(this, book)
    if (newbook.statusCode) {
      return newbook
    } else {
      commit('ADD_NEWBOOK', newbook)
    }
  },

  async fetchBooks({ state, commit, $nuxt }, filters) {
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
    const books = await BookService.qlBooks(this, filters)
    if (books.statusCode) {
      return books
    } else {
      commit('SET_BOOKS_PREVIEW', books)
    }
  },

  async uploadPhoto({ state, commit }, image) {
    if (!image) {
      return
    }

    const err = await BookService.qlUploadPhoto(
      this,
      image,
      state.BookId,
      state.PageId
    )
    if (err.statusCode) {
      return err
    } else {
      commit('SET_PAGE_IMAGE_TYPE', image.type)
    }
  }
}

export const getters = {
  getPage(state, getters, rootState, rootGetters) {
    let page = { ...state.PagesCache[state.PageId] }
    while (_.isEqual(page, {})) {
      page = this.getPage()
    }
    page.pageNum = page.pageNum + ''
    return page
  },
  getPageURLId(state) {
    try {
      const id =
        _.findIndex(
          _.sortBy(state.BooksCache[state.BookId].pages, ['pageNum']),
          { id: state.PageId }
        ) + 1

      return id
    } catch (e) {
      return ''
    }
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
