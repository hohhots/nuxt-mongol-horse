import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      scrollBarHeight: 0
    },
    mutations: {
      setScrollBarHeight(state, barHeight) {
        state.scrollBarHeight = barHeight
      }
    },
    actions: {
      setScrollBarHeight(vueContext, barHeight) {
        vueContext.commit('setScrollBarHeight', barHeight)
      }
    },
    getters: {
      getScrollBarHeight(state) {
        return state.scrollBarHeight
      }
    }
  })
}

export default createStore
