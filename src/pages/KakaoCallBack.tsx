import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { usernameAtom } from '../store/mainpageStore';

export const KakaoCallback = () => {
  const [, setUserToken] = useAtom(usernameAtom);
  const navigate = useNavigate();
  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get('code');

    (async () => {
      try {
        const response = await axiosInstance.get(`/login?code=${code}`);
        // const accessKey = response.headers.access_key;
        // const refreshKey = response.headers.refresh_key;
        // const decodedAccessToken: { exp: number } = jwtDecode(accessKey);
        // const decodedRefreshToken: { exp: number } = jwtDecode(refreshKey);
        // const accessExp = decodedAccessToken.exp;
        // const refreshExp = decodedRefreshToken.exp;
        // const accessExpireDate = new Date(accessExp * 1000);
        // const refreshExpireDate = new Date(refreshExp * 1000);
        // Cookies.set('accessKey', accessKey, {
        //   expires: accessExpireDate,
        // });
        // Cookies.set('refreshKey', refreshKey, {
        //   expires: refreshExpireDate,
        // });
        setUserToken(true);
        navigate('/');
        return response;
      } catch (error) {
        throw error as Error;
      }
    })();
  }, []);

  return <div>카카오 로그인중입니다</div>;
};
