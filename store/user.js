import { Login } from '@/graphql/User'

export const state = () => ({
  user: {},
  jwt: ''
})

export const mutations = {
  SET_USER_JWT(state, login) {
    state.user = login.user
    state.jwt = login.token

    this.$apolloHelpers.onLogin(state.jwt)
  }
}

export const actions = {
  async login({ state, commit }, emailPassword) {
    const apollo = this.app.apolloProvider.defaultClient

    try {
      await apollo
        .mutate({
          mutation: Login,
          variables: {
            email: emailPassword.email,
            password: emailPassword.password
          }
        })
        .then(({ data }) => {
          commit('SET_USER_JWT', data.login)
        })
    } catch (e) {
      alert(e)
    }
  }
}

export const getters = {
  loggedIn(state) {
    return state.jwt ? 1 : 0
  }
}
