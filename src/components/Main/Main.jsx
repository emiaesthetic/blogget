import style from './Main.module.css';
import Layout from '../Layout';
import Tabs from './Tabs';
import List from './List';
import Modal from '../Modal';
import { Route, Routes } from 'react-router-dom';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Tabs />
      <Routes>
        <Route path="category/:page" element={<List />}>
          <Route path="post/:id" element={<Modal />} />
        </Route>
      </Routes>
    </Layout>
  </main>
);
