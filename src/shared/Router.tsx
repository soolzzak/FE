import { AnimatePresence } from 'framer-motion';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Mypage } from '../pages/Mypage';
import { Signup } from '../pages/Signup';
import { StreamRoom } from '../pages/StreamRoom';

export const Router = () => (
  <Layout>
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/room/:id" element={<StreamRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AnimatePresence>
  </Layout>
);
