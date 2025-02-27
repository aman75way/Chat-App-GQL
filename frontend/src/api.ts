import { ApolloClient, InMemoryCache, createHttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Define GraphQL Backend URL
const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql", // Change to your backend URL
  credentials: "include",
});

// Attach Authorization Token (if available)
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});


// **Get Current User**
export const GET_ME = gql`
  query Me {
    me {
      id
      email
      fullName
      profilePic
      gender
    }
  }
`;


// **Initialize Apollo Client**
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// =======================
// GraphQL Queries & Mutations
// =======================

// **Get Conversations (List of Users except current user)**
export const GET_CONVERSATIONS = gql`
  query GetConversations {
    conversations {
      id
      fullName
      profilePic
    }
  }
`;

// **Get Messages by User to Chat With**
export const GET_MESSAGES = gql`
  query GetMessages($userToChatId: String!) {
    getMessages(userToChatId: $userToChatId) {
      id
      senderId
      body
      conversationId
      createdAt
    }
  }
`;

// **User Signup**
export const SIGNUP_MUTATION = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $fullName: String!
    $gender: Gender!
  ) {
    signup(
      email: $email
      password: $password
      fullName: $fullName
      gender: $gender
    ) {
      accessToken
      refreshToken
      user {
        id
        email
        fullName
        gender
        profilePic
      }
    }
  }
`;

// **User Login**
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        id
        email
        fullName
        gender
        profilePic
      }
    }
  }
`;

// **Logout**
export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

// **Send Message**
export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($receiverId: String!, $message: String!) {
    sendMessage(receiverId: $receiverId, message: $message) {
      id
      senderId
      body
      conversationId
      createdAt
    }
  }
`;

// =======================
// API Utility Functions
// =======================

// **Query Function (for fetching data)**
export const queryFn = async (query: any, variables = {}) => {
  try {
    const { data } = await client.query({ query, variables, fetchPolicy: "network-only" });
    return data;
  } catch (error) {
    console.error("GraphQL Query Error:", error);
    throw error;
  }
};

// **Mutation Function (for modifying data)**
export const mutateFn = async (mutation: any, variables = {}) => {
  try {
    const { data } = await client.mutate({ mutation, variables });
    return data;
  } catch (error) {
    console.error("GraphQL Mutation Error:", error);
    throw error;
  }
};
