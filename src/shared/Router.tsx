import { AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { ChangePassword } from '../pages/ChangePassword';
import { Home } from '../pages/Home';
import { KakaoCallback } from '../pages/KakaoCallBack';
import { Mypage } from '../pages/Mypage';
import { NotFound } from '../pages/NotFound';
import { Signup } from '../pages/Signup';
import { StreamRoom } from '../pages/StreamRoom';
import { handleTokenChangeAtom } from '../store/mainpageStore';
import { DeleteAccount } from '../components/login/DeleteAccount';

export const Router = () => {
  const token = Cookies.get('accessKey');
  const [, setUserToken] = useAtom(handleTokenChangeAtom);
  const location = useLocation();

  useEffect(() => {
    if (token) {
      setUserToken(token);
    }
  }, []);

  return (
    // <Layout>
    <Layout
      hideFooter={
        location.pathname === '/signup' ||
        /^\/room\/\d+$/.test(location.pathname)
      }
    >
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/room/:id" element={<StreamRoom />} />
          <Route path="/pwchange" element={<ChangePassword />} />
          <Route path="/api/login" element={<KakaoCallback />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tempdeleteaccount" element={<DeleteAccount />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};
