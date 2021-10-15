import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, HttpLink, InMemoryCache } from '@apollo/client';
// import { FirstApp } from './components/FirstApp';
// import { LoginUser } from './components/LoginUser';
// import { setContext } from "@apollo/client/link/context";
// import { GetProfiles } from './components/getProfile';
// import { GetRecords } from './components/getRecords';
// import { Login } from './components/Fantasy-WL/Login';
// import { GetMatches } from './components/Fantasy-WL/getMatches';
// import { GetMatch } from './components/Fantasy-WL/getMatch';
import Routes from './Routes/Routes';

const httpLink = createHttpLink({
  // uri: 'http://mi-recall-graphql.herokuapp.com/graphql',
  uri: 'https://fantasy-wl-graphql.herokuapp.com/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('gql_token');

  operation.setContext({
    headers: {
      authorization: token ? token : ''
    }
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {

  return (
    <ApolloProvider client={client}>
      <Routes client={client}></Routes>
    </ApolloProvider>
  );
}

export default App;
