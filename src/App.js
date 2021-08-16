import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { FirstApp } from './components/FirstApp';
import { LoginUser } from './components/LoginUser';

function App() {


  const client = new ApolloClient({
    uri: 'http://mi-recall-graphql.herokuapp.com/graphql',
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      <LoginUser />
    </ApolloProvider>
  );
}

export default App;
