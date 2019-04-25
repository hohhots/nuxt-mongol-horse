export const state = () => ({
  scrollBarHeight: 0,
  htmlContentHeight: 0
})

export const mutations = {
  setScrollBarHeight(state, barHeight) {
    state.scrollBarHeight = barHeight
  },
  setHtmlContentHeight(state, htmlContentHeight) {
    state.htmlContentHeight = htmlContentHeight
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
    return state.scrollBarHeight
  },
  getHtmlContentHeight(state) {
    return state.htmlContentHeight
  }
}
