import gql from 'graphql-tag'

export default gql`
  query getBook($bookId: ID!) {
    book(bookId: $bookId) {
      id
      title
      author
      publishedAt
      preview
      pages {
        id
        # pageNum
        # content
        # imageType
      }
      postedBy {
        name
      }
    }
  }
`
