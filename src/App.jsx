import Header from './components/Header';
import Main from './components/Main';
import { AuthContextProvider } from './context/authContext';
import { TokenContextProvider } from './context/tokenContext.jsx';
import { PostsContextProvider } from './context/postsContext.jsx';

function App() {
  return (
    <TokenContextProvider>
      <AuthContextProvider>
        <Header />
        <PostsContextProvider>
          <Main />
        </PostsContextProvider>
      </AuthContextProvider>
    </TokenContextProvider>
  );
}

export default App;
