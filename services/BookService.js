import settings from '@/settings.js'
import { getPage, updatePage, newPage } from '@/graphql/Page'
import { getBook, updateBook, newBook, getBooks } from '@/graphql/Book'
import { uploadPhoto } from '@/graphql/UploadPhoto'

let apolloCli

function setApolloCli(ob) {
  if (!apolloCli) {
    apolloCli = ob.app.apolloProvider.defaultClient
  }
}

export default {
  qlPage(ob, pageid) {
    setApolloCli(ob)
    return apolloCli
      .query({
        query: getPage,
        variables: {
          pageId: pageid
        }
      })
      .then(({ data }) => {
        return data.page
      })
      .catch(e => {
        e.statusCode = 503
        e.message = settings.mErrorMessages.fetchPageError
        return e
      })
  },
  qlUpdatePage(ob, page) {
    setApolloCli(ob)

    return apolloCli
      .mutate({
        mutation: updatePage,
        variables: {
          pageNum: parseInt(page.pageNum),
          content: page.content,
          pageId: page.id
        }
      })
      .catch(e => {
        e.statusCode = 503
        e.message = settings.mErrorMessages.updatePageError
        return e
      })
  },
  qlNewPage(ob, bookid, page) {
    setApolloCli(ob)
    return apolloCli
      .mutate({
        mutation: newPage,
        variables: {
          pageNum: parseInt(page.pageNum),
          content: page.content,
          bookId: bookid
        }
        // update: (store, { data: { newPage } }) => {
        //   console.log(
        //     'update - ',
        //     store.readQuery({
        //       query: getBookPagesId,
        //       variables: {
        //         bookId: state.BookId
        //       }
        //     })
        //   )
        //   const data = store.readQuery({
        //     query: getBookPagesId,
        //     variables: {
        //       bookId: state.BookId
        //     }
        //   })

        //   data.book.pages.push({
        //     id: newPage.id,
        //     pageNum: newPage.pageNum,
        //     __typename: 'Page'
        //   })

        //   store.writeQuery({
        //     query: getBookPagesId,
        //     variables: {
        //       bookId: state.BookId
        //     },
        //     data
        //   })
        // }
      })
      .then(({ data }) => {
        return data.newPage
      })
      .catch(e => {
        e.statusCode = 503
        e.message = settings.mErrorMessages.newPageError
        return e
      })
  },
  qlBook(ob, bookid) {
    setApolloCli(ob)
    return apolloCli
      .query({
        query: getBook,
        variables: {
          bookId: bookid
        }
      })
      .then(({ data }) => {
        return data.book
      })
      .catch(e => {
        e.statusCode = 503
        e.message = settings.mErrorMessages.fetchBookError
        return e
      })
  },
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
  qlUpdateBook(ob, book) {
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
  qlNewBook(ob, book) {
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
  },
  qlUploadPhoto(ob, photo, bookid, pageid) {
    setApolloCli(ob)

    return apolloCli
      .mutate({
        mutation: uploadPhoto,
        variables: {
          photo: photo,
          bookId: bookid,
          pageId: pageid
        }
      })
      .catch(e => {
        e.statusCode = 503
        e.message = settings.mErrorMessages.uploadPhotoError
        return e
      })
  }
}
