import { useToken } from './hooks/useToken';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  const [token] = useToken('');

  return (
    <>
      <Header token={token} />
      <Main />
    </>
  );
}

export default App;
