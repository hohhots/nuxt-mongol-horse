import {
  getBook,
  updateBook,
  newBook,
  getBooks,
  getFilterBooks
} from '@/graphql/Book'

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
    if (filters.filter) {
      return apolloCli.query({
        query: getFilterBooks,
        variables: {
          filter: filters.filter,
          skip: filters.skip,
          first: filters.first
        }
      })
    } else {
      return apolloCli.query({
        query: getBooks,
        variables: {
          skip: filters.skip,
          first: filters.first
        }
      })
    }
  },
  updateBook(ob, book) {
    setApolloCli(ob)
    return apolloCli.mutate({
      mutation: updateBook,
      variables: {
        bookId: book.id,
        title: book.title,
        author: book.author,
        publishedAt: book.publishedAt,
        preview: book.preview
      }
    })
  },
  addNewBook(ob, book) {
    setApolloCli(ob)
    return apolloCli.mutate({
      mutation: newBook,
      variables: {
        title: book.title,
        author: book.author,
        publishedAt: book.publishedAt,
        preview: book.preview
      }
    })
  }
}
