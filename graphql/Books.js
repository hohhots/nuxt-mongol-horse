import gql from 'graphql-tag'

export default gql`
  query getBooks($filter: String, $skip: Int!, $first: Int!) {
    bookList(
      filter: $filter
      skip: $skip
      first: $first
      orderBy: createdAt_DESC
    ) {
      books {
        id
        title
        preview
      }
      count
    }
  }
`
