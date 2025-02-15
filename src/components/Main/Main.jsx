import style from './Main.module.css';
import Layout from '../Layout';
import Home from './Home';
import Tabs from './Tabs';
import List from './List';
import Error from './Error';
import Modal from '../Modal';
import { Route, Routes } from 'react-router-dom';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Tabs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Home />} />
        <Route path="/:filter/:page?" element={<List />}>
          <Route path="post/:id" element={<Modal />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Layout>
  </main>
);
