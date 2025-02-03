import Header from './components/Header';
import Main from './components/Main';
import { AuthContextProvider } from './context/authContext';
import { TokenContextProvider } from './context/tokenContext.jsx';
import { PostsContextProvider } from './context/postsContext.jsx';
import { CommentContextProvider } from './context/commentContext.jsx';

function App() {
  return (
    <TokenContextProvider>
      <AuthContextProvider>
        <PostsContextProvider>
          <CommentContextProvider>
            <Header />
            <Main />
          </CommentContextProvider>
        </PostsContextProvider>
      </AuthContextProvider>
    </TokenContextProvider>
  );
}

export default App;
