export const state = () => ({
  scrollBarHeight: 0
})

export const mutations = {
  setScrollBarHeight(state, barHeight) {
    state.scrollBarHeight = barHeight
  }
}

export const actions = {
  setScrollBarHeight({ commit }, barHeight) {
    commit('setScrollBarHeight', barHeight)
  }
}

export const getters = {
  getScrollBarHeight(state) {
    return state.scrollBarHeight
  }
}
