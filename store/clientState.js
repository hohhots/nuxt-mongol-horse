export const state = () => ({
  browser: { scrollBarHeight: 0, htmlContentHeight: 0 }
})

export const mutations = {
  setScrollBarHeight(state, barHeight) {
    state.browser.scrollBarHeight = barHeight
  },
  setHtmlContentHeight(state, htmlContentHeight) {
    state.browser.htmlContentHeight = htmlContentHeight
  }
}

export const actions = {
  setScrollBarHeight({ commit }, barHeight) {
    commit('setScrollBarHeight', barHeight)
  },
  setHtmlContentHeight({ commit }, htmlContentHeight) {
    commit('setHtmlContentHeight', htmlContentHeight)
  }
}

export const getters = {
  getScrollBarHeight(state) {
    return state.browser.scrollBarHeight
  },
  getHtmlContentHeight(state) {
    return state.browser.htmlContentHeight
  }
}
