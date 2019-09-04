import gql from 'graphql-tag'

export default gql`
  mutation uploadFile($photo: Upload!, $bookId: String!, $pageId: String!) {
    uploadFile(file: $photo, bookId: $bookId, pageId: $pageId) {
      filename
      mimetype
    }
  }
`
