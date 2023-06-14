import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiResponse } from '../api/auth';

export const KakaoCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const code = new URL(document.location.toString()).searchParams.get('code');

    (async () => {
      try {
        const response: AxiosResponse<ApiResponse> = await axios.get(
          `https://api.honsoolzzak.com/api/login?code=${code}`
        );
        const accessKey = response.headers.access_key;
        console.log('response',response)
        // const refreshKey = response.headers.refresh_key;
        const decodedAccessToken: { exp: number } = jwtDecode(accessKey);
        // const decodedRefreshToken: { exp: number } = jwtDecode(refreshKey);
        const accessExp = decodedAccessToken.exp;
        // const refreshExp = decodedRefreshToken.exp;
        const accessExpireDate = new Date(accessExp * 1000);
        // const refreshExpireDate = new Date(refreshExp * 1000);
        Cookies.set('accessKey', accessKey, {
          expires: accessExpireDate,
        });
        // Cookies.set('refreshKey', refreshKey, {
        //   expires: refreshExpireDate,
        // });
        navigate('/');
        return response;
      } catch (error) {
        throw error as Error;
      }
    })();
  }, []);

  return <div>카카오 로그인중입니다</div>;
};
