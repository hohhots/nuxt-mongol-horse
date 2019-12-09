import { login } from '@/graphql/User'

let apolloCli

function setApolloCli(ob) {
  if (!apolloCli) {
    apolloCli = ob.app.apolloProvider.defaultClient
  }
}

export default {
  login(ob, emailPassword) {
    setApolloCli(ob)
    return apolloCli.mutate({
      mutation: login,
      variables: {
        email: emailPassword.email,
        password: emailPassword.password
      }
    })
  }
}
