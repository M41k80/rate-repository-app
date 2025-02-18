import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false, $first: Int, $after: String) {
    me {
      id
      username
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
            repository {
              id
              fullName
              description
              language
              forksCount
              stargazersCount
              reviewCount
              ratingAverage
              ownerAvatarUrl
              url
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;