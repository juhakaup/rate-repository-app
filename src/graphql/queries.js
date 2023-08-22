import { gql } from "@apollo/client";
import { REPOSITORY_FIELDS } from "./fragments";
import { REVIEW_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...repositoryFields
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
`;

export const GET_CURRENT_USER = gql`
  query($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...reviewFields
          }
        }
      }
    }
  }
  ${REVIEW_FIELDS}
`
export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...repositoryFields
      reviews {
        edges {
          node {
            ...reviewFields
          }
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
  ${REVIEW_FIELDS}
`