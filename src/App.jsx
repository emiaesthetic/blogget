import { useToken } from './hooks/useToken';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [token, removeToken] = useToken('');

  return (
    <>
      <Header token={token} removeToken={removeToken} />
      <Main />
    </>
  );
}

export default App;
