import { useToken } from './hooks/useToken';
import Header from './components/Header';
import Main from './components/Main';
import { AuthContextProvider } from './context/authContext';
import { tokenContext } from './context/tokenContext';

function App() {
  const [token, removeToken] = useToken('');

  return (
    <tokenContext.Provider value={{ token, removeToken }}>
      <AuthContextProvider>
        <Header />
        <Main />
      </AuthContextProvider>
    </tokenContext.Provider>
  );
}

export default App;
