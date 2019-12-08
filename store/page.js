import _ from 'lodash'

// import settings from '@/settings.js'
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
  SET_BOOK_PAGES(state, pages) {
    state.BooksCache[state.BookId].pages = pages
  }
}

export const actions = {
  fetchPage({ state, commit, getters, dispatch }, bookPageid) {
    const book = bookPageid.book
    const id = bookPageid.pageid
    const pageid = book.pages[id - 1].id
    // commit('SET_PAGEID', pageid)
    if (state.PagesCache[pageid]) {
      return
    }
    console.log('fetch page')
    return PageService.getPage(this, pageid).then(({ data }) => {
      commit('SET_PAGE', data.page)
      commit('SET_PAGEID', pageid)
    })
  },

  async updatePage({ state, commit }, page) {
    const err = await PageService.qlUpdatePage(this, page)
    if (err) {
      return err
    } else {
      commit('UPDATE_PAGE', page)
    }
  },

  async newPage({ state, commit }, page) {
    const newpage = await PageService.qlNewPage(this, state.BookId, page)
    if (newpage.statusCode) {
      return newpage
    } else {
      commit('ADD_NEWPAGE', newpage)
    }
  },

  async uploadPhoto({ state, commit }, image) {
    if (!image) {
      return
    }

    const err = await PageService.qlUploadPhoto(
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
  getPage(state) {
    const page = { ...state.PagesCache[state.PageId] }
    // while (_.isEqual(page, {})) {
    //   page = this.getPage()
    // }
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
  }
}
