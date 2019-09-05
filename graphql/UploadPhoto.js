import gql from 'graphql-tag'

export default gql`
  mutation uploadPhoto($photo: Upload!, $bookId: String!, $pageId: String!) {
    uploadPhoto(file: $photo, bookId: $bookId, pageId: $pageId) {
      filename
      mimetype
    }
  }
`
