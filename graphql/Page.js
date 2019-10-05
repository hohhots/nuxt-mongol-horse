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
