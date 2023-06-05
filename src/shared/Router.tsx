import { Route, Routes } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { Home } from '../pages/Home';
import { Mypage } from '../pages/Mypage';
import { Signup } from '../pages/Signup';
import { StreamRoom } from '../pages/StreamRoom';

export const Router = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/room/:id" element={<StreamRoom />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </Layout>
);
