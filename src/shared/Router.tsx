import { AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { Home } from '../pages/Home';
import { Mypage } from '../pages/Mypage';
import { Signup } from '../pages/Signup';
import { StreamRoom } from '../pages/StreamRoom';
import { handleTokenChangeAtom } from '../store/mainpageStore';
import { Login } from '../pages/Login';
import { NotFound } from '../pages/NotFound';

export const Router = () => {
  const token = Cookies.get('accessKey');
  const [, setUserToken] = useAtom(handleTokenChangeAtom);

  useEffect(() => {
    if (token) {
      setUserToken(token);
    }
  }, []);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/room/:id" element={<StreamRoom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};
