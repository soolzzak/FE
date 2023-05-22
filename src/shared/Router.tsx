import { Layout } from '../layout/Layout';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { StreamRoom } from '../pages/StreamRoom';
import { CreateStreamRoom } from '../pages/CreateStreamRoom';
import { Mypage } from '../pages/Mypage';

export const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/room" element={<StreamRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createroom" element={<CreateStreamRoom />} />
      </Routes>
    </Layout>
  );
};
