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
  updatePage(ob, upage, updatePages) {
    setApolloCli(ob)
    return apolloCli.mutate({
      mutation: updatePage,
      variables: {
        pageNum: parseInt(upage.pageNum),
        content: upage.content,
        pageId: upage.id,
        updatePages
      }
    })
  },
  newPage(ob, bookid, page, updatePages) {
    setApolloCli(ob)
    return apolloCli.mutate({
      mutation: newPage,
      variables: {
        pageNum: parseInt(page.pageNum),
        content: page.content,
        bookId: bookid,
        updatePages
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
