export const state = () => ({
  user: {},
  jwt: ''
})

export const mutations = {
  SET_USER_JWT(state, login) {
    state.user = login.user
    state.jwt = login.token
  }
}

export const actions = {
  async login({ state, commit }, emailPassword) {
    const query = `mutation {
      login( 
        email: "${emailPassword.email}"
        password: "${emailPassword.password}"
      ) {
        token
        user {
          name
          email
        }
      }
    }`
    const login = await this.$axios.$post('/', { query })

    if (login.errors) {
      alert(login.errors[0].message)
      return
    }
    commit('SET_USER_JWT', login.data.login)
  }
}
