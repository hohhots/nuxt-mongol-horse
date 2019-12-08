import settings from '@/settings.js'
import { getBook, updateBook, newBook, getBooks } from '@/graphql/Book'

let apolloCli

function setApolloCli(ob) {
  if (!apolloCli) {
    apolloCli = ob.app.apolloProvider.defaultClient
  }
}

export default {
  getBook(ob, bookid) {
    setApolloCli(ob)
    return apolloCli.query({
      query: getBook,
      variables: {
        bookId: bookid
      }
    })
  },
  getBooks(ob, filters) {
    setApolloCli(ob)
    return apolloCli.query({
      query: getBooks,
      variables: {
        filter: filters.filter,
        skip: filters.skip,
        first: filters.first
      }
    })
  },
  updateBook(ob, book) {
    setApolloCli(ob)

    return apolloCli
      .mutate({
        mutation: updateBook,
        variables: {
          bookId: book.id,
          title: book.title,
          author: book.author,
          publishedAt: book.publishedAt,
          preview: book.preview
        }
      })
      .catch(e => {
        e.statusCode = 503
        e.message = settings.mErrorMessages.updateBookError
        return e
      })
  },
  addNewBook(ob, book) {
    setApolloCli(ob)
    return apolloCli
      .mutate({
        mutation: newBook,
        variables: {
          title: book.title,
          author: book.author,
          publishedAt: book.publishedAt,
          preview: book.preview
        }
      })
      .then(({ data }) => {
        return data.newBook
      })
      .catch(e => {
        e.statusCode = 503
        e.message = settings.mErrorMessages.newBookError
        return e
      })
  }
}
