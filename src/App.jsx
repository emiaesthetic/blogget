import Header from './components/Header';
import Main from './components/Main';
import { store } from './store';
import { Provider } from 'react-redux';
import { AuthContextProvider } from './context/authContext';
import { TokenContextProvider } from './context/tokenContext.jsx';
import { PostsContextProvider } from './context/postsContext.jsx';
import { CommentContextProvider } from './context/commentContext.jsx';

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
