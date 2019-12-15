import { getPage, updatePage, newPage } from '@/graphql/Page'
import { uploadPhoto } from '@/graphql/UploadPhoto'

let apolloCli

function setApolloCli(ob) {
  if (!apolloCli) {
    apolloCli = ob.app.apolloProvider.defaultClient
  }
}

export default {
  getPage(ob, pageid) {
    setApolloCli(ob)
    return apolloCli.query({
      query: getPage,
      variables: {
        pageId: pageid
      }
    })
  },
  updatePage(ob, page) {
    setApolloCli(ob)
    return apolloCli.mutate({
      mutation: updatePage,
      variables: {
        pageNum: parseInt(page.pageNum),
        content: page.content,
        pageId: page.id
      }
    })
  },
  newPage(ob, bookid, page, pagesid) {
    setApolloCli(ob)
    return apolloCli.mutate({
      mutation: newPage,
      variables: {
        pageNum: parseInt(page.pageNum),
        content: page.content,
        bookId: bookid,
        pagesId: pagesid
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
  },
  uploadPhoto(ob, photo, bookid, pageid) {
    setApolloCli(ob)
    return apolloCli.mutate({
      mutation: uploadPhoto,
      variables: {
        photo: photo,
        bookId: bookid,
        pageId: pageid
      }
    })
  }
}
