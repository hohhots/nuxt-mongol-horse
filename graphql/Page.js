import gql from 'graphql-tag'

export const getPage = gql`
  query getPage($pageId: ID!) {
    page(pageId: $pageId) {
      id
      imageType
      pageNum
      content
      book {
        id
      }
    }
  }
`

export const newPage = gql`
  mutation newPage($pageNum: Int!, $content: String!, $bookId: String!) {
    newPage(pageNum: $pageNum, content: $content, bookId: $bookId) {
      id
    }
  }
`

export const updatePage = gql`
  mutation updatePage($pageNum: Int!, $content: String!, $pageId: String!) {
    updatePage(pageNum: $pageNum, content: $content, pageId: $pageId) {
      id
    }
  }
`
