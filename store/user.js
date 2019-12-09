import UserService from '@/services/UserService.js'

export const state = () => ({
  user: null,
  jwt: null
})

export const mutations = {
  LOGIN(state, login) {
    state.user = login.user
    state.jwt = login.token

    if (!login.local) {
      localStorage.setItem('user', JSON.stringify(login))
    }
    this.$apolloHelpers.onLogin(state.jwt)
  },
  LOGOUT(state) {
    localStorage.removeItem('user')
    location.reload()
  }
}

export const actions = {
  login({ commit }, emailPassword) {
    return UserService.login(this, emailPassword).then(({ data }) => {
      commit('LOGIN', data.login)
    })
  },
  initLogin({ commit }) {
    let login = localStorage.getItem('user')
    if (login) {
      login = JSON.parse(login)
      login.local = true
      commit('LOGIN', login)
    }
  },
  logout({ commit }) {
    commit('LOGOUT')
  }
}

export const getters = {
  loggedIn(state) {
    return !!state.user
  }
}
