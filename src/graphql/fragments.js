import { gql } from '@apollo/client';

export const REPOSITORY_FIELDS = gql` 
  fragment repositoryFields on Repository {
    fullName
    forksCount
    ownerAvatarUrl
    ratingAverage
    reviewCount
    stargazersCount
    id
    language
    url
    description
  }
`;

export const REVIEW_FIELDS = gql`
  fragment reviewFields on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
  }
`;