import gql from "graphql-tag";

export const AllUsersQuery = gql`
  query allUsers {
    getAllUsers {
      name
    }
  }
`;

export const UserQuery = gql`
  query User($id: Int!) {
    user(where: { id: $id }) {
      id
      name
    }
  }
`;
