import { gql } from 'apollo-boost';

export const POST_CATEGORY = gql`
  mutation PostCategory($categoryName: String!) {
    postCategory(name: $categoryName) {
      id
      name
      keywords {
        id
        name
      }
    }
  }
`;

export const POST_KEYWORD = gql`
  mutation PostKeyword($keywordName: String!, $categoryId: ID!) {
    postKeyword(name: $keywordName, categoryId: $categoryId) {
      id
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation RemoveCategory($categoryId: ID!) {
    removeCategory(categoryId: $categoryId) {
      id
    }
  }
`;

export const DELETE_KEYWORD = gql`
  mutation RemoveKeyword($keywordId: ID!) {
    removeKeyword(keywordId: $keywordId){
      id
    }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
      keywords {
        id
        name
      }
    }
  }
`;
