export const state = () => ({
  browser: { scrollBarHeight: 0, bodyContentHeight: 0 }
})

export const mutations = {
  setScrollBarHeight(state, barHeight) {
    state.browser.scrollBarHeight = barHeight
  },
  setBodyContentHeight(state, bodyContentHeight) {
    state.browser.bodyContentHeight = bodyContentHeight
  }
}

export const actions = {
  setScrollBarHeight({ commit }, barHeight) {
    commit('setScrollBarHeight', barHeight)
  },
  setBodyContentHeight({ commit }, bodyContentHeight) {
    commit('setBodyContentHeight', bodyContentHeight)
  }
}

export const getters = {
  getScrollBarHeight(state) {
    return state.browser.scrollBarHeight
  },
  getBodyContentHeight(state) {
    return state.browser.bodyContentHeight
  }
}
