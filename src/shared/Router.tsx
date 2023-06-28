import { AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useMutation } from 'react-query';
import { Route, Routes, useLocation } from 'react-router-dom';
import { userInfo } from '../api/auth';
import { Layout } from '../layout/Layout';
import { ChangePassword } from '../pages/ChangePassword';
import { Home } from '../pages/Home';
import { KakaoCallback } from '../pages/KakaoCallBack';
import { Mypage } from '../pages/Mypage';
import { NotFound } from '../pages/NotFound';
import { Signup } from '../pages/Signup';
import { StreamRoom } from '../pages/StreamRoom';
import {
  handleTokenChangeAtom,
  handleUserTokenAtom,
} from '../store/mainpageStore';
// import Filter from '../pages/Filter';

export const Router = () => {
  const location = useLocation();

  const [, setIsLoggedIn] = useAtom(handleTokenChangeAtom);
  const [, setUserAtom] = useAtom(handleUserTokenAtom);

  const userInfoMutation = useMutation(userInfo, {
    onSuccess: (data) => {
      setIsLoggedIn(true);
      setUserAtom(data.data);
      // console.log(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    userInfoMutation.mutate();
  }, []);

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
      title: location.pathname,
    });
  }, [location]);

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
          {/* <Route path="/filter" element={<Filter />} /> */}
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};
