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
    const login = await apollo.mutate({
      mutation: Login,
      variables: {
        email: emailPassword.email,
        password: emailPassword.password
      }
    })

    if (login.errors) {
      alert(login.errors[0].message)
      return
    }
    commit('SET_USER_JWT', login.data.login)
  }
}

export const getters = {
  loggedIn(state) {
    return state.jwt ? 1 : 0
  }
}
