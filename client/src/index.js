import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import App from './App';
import { StoreProvider } from './store'
import Register from './pages/Register'
import Test from './pages/Test'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: 'http://localhost:3333/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Verify ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <StoreProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}></Route>
          <Route path="/register" element={< Register/>}></Route>
          <Route path="/test" element={< Test />}></Route>
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </ApolloProvider>
  </React.StrictMode>
);



