import _ from 'lodash'

import PageService from '@/services/PageService.js'

export const state = () => ({
  // current display page id
  PageId: '',
  // id: page
  PagesCache: {},

  // model for page
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

    const bookState = this.state.book
    const pages = bookState.BooksCache[bookState.BookId].pages
    pages.push({
      id: newpage.id,
      pageNum: newpage.pageNum,
      __typename: 'Page'
    })
    bookState.BooksCache[bookState.BookId].pages = _.sortBy(pages, ['pageNum'])
  },
  UPDATE_PAGE(state, page) {
    const bookState = this.state.book
    const tp = { ...page }
    tp.pageNum = parseInt(tp.pageNum)
    _.assign(state.PagesCache[tp.id], tp)

    const pages = bookState.BooksCache[bookState.BookId].pages
    const upage = _.find(pages, { id: tp.id })
    upage.pageNum = tp.pageNum

    bookState.BooksCache[bookState.BookId].pages = _.sortBy(pages, ['pageNum'])
  },
  SET_PAGE_IMAGE_TYPE(state, imageType) {
    state.PagesCache[state.PageId].imageType = imageType.split('/')[1]
  },
  SET_BOOK_PAGES(state, pages) {
    state.BooksCache[state.BookId].pages = pages
  }
}

export const actions = {
  fetchPage({ state, commit }, bookPageid) {
    const book = bookPageid.book
    const id = bookPageid.pageid
    const pageid = book.pages[id - 1].id
    commit('SET_PAGEID', pageid) // must first set page id whether page cached
    if (state.PagesCache[pageid]) {
      return
    }
    console.log('fetch page')
    return PageService.getPage(this, pageid).then(({ data }) => {
      commit('SET_PAGE', data.page)
    })
  },

  updatePage({ commit }, page) {
    return PageService.updatePage(this, page).then(() => {
      commit('UPDATE_PAGE', page)
    })
  },

  newPage({ commit }, newpage) {
    return PageService.newPage(this, newpage.bookid, newpage.page).then(
      ({ data }) => {
        commit('ADD_NEWPAGE', data.newPage)
      }
    )
  },

  uploadPhoto({ state, commit }, image) {
    if (!image) {
      return
    }

    const bookState = this.state.book
    return PageService.uploadPhoto(
      this,
      image,
      bookState.BookId,
      state.PageId
    ).then(() => {
      commit('SET_PAGE_IMAGE_TYPE', image.type)
    })
  }
}

export const getters = {
  // method style getter will disable cache
  getPage: state => id => {
    const page = { ...state.PagesCache[id] }
    page.pageNum = page.pageNum + ''
    return page
  }
  // getPageURLId(state) {
  //   const bookState = this.state.book
  //   try {
  //     const id =
  //       _.findIndex(
  //         _.sortBy(bookState.BooksCache[bookState.BookId].pages, ['pageNum']),
  //         { id: state.PageId }
  //       ) + 1

  //     return id
  //   } catch (e) {
  //     return ''
  //   }
  // }
}
