import gql from 'graphql-tag'

export const getBook = gql`
  query getBook($bookId: ID!) {
    book(bookId: $bookId) {
      id
      title
      author
      publishedAt
      preview
      pages {
        id
        pageNum
      }
      postedBy {
        name
      }
    }
  }
`

export const newBook = gql`
  mutation newBook(
    $title: String!
    $author: String!
    $publishedAt: String!
    $preview: String!
  ) {
    newBook(
      title: $title
      author: $author
      publishedAt: $publishedAt
      preview: $preview
    ) {
      id
    }
  }
`

export const updateBook = gql`
  mutation updateBook(
    $bookId: String!
    $title: String!
    $author: String!
    $publishedAt: String!
    $preview: String!
  ) {
    updateBook(
      bookId: $bookId
      title: $title
      author: $author
      publishedAt: $publishedAt
      preview: $preview
    ) {
      id
      title
      author
      publishedAt
      preview
    }
  }
`

export const getBooks = gql`
  query getBooks($skip: Int!, $first: Int!) {
    bookList(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      books {
        id
        title
        preview
      }
      count
    }
  }
`

export const getFilterBooks = gql`
  query getBooks($filter: String!, $skip: Int!, $first: Int!) {
    bookFilterList(
      filter: $filter
      skip: $skip
      first: $first
      orderBy: createdAt_DESC
    ) {
      books {
        id
        title
        preview
        pages {
          id
          imageType
          pageNum
          content
          book {
            id
          }
        }
      }
      count
    }
  }
`
