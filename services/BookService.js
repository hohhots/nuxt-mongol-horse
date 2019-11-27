import settings from '@/settings.js'
import { getBooks } from '@/graphql/Book'
// getBook, newBook, updateBook
let apolloCli

function setApolloCli(ob) {
  if (!apolloCli) {
    apolloCli = ob.app.apolloProvider.defaultClient
  }
}

export default {
  qlBooks(ob, filters) {
    setApolloCli(ob)
    return apolloCli
      .query({
        query: getBooks,
        variables: {
          filter: filters.filter,
          skip: filters.skip,
          first: filters.first
        }
      })
      .then(({ data }) => {
        return {
          booksList: data.bookList,
          filter: filters.filter,
          skip: filters.skip
        }
      })
      .catch(e => {
        e.statusCode = 503
        e.message = settings.mErrorMessages.fetchBooksError
        return e
      })
  },
  qlBook(ob, id) {
    setApolloCli(ob)
  },
  qlUpdateBook(ob, id) {
    setApolloCli(ob)
  },
  qlNewBook(ob) {
    setApolloCli(ob)
  },
  qlPage(ob, id) {
    setApolloCli(ob)
  },
  qlUpdatePage(ob, id) {
    setApolloCli(ob)
  },
  qlNewPage(ob) {
    setApolloCli(ob)
  }
}
