import { gql } from "@apollo/client";
import { REPOSITORY_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...repositoryFields
        }
      }
    }
  }
  ${REPOSITORY_FIELDS}
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`
export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...repositoryFields
    }
  }
  ${REPOSITORY_FIELDS}
`