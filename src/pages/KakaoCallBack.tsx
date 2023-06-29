import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { kakaoLoginApi, userInfo } from '../api/auth';
import axiosInstance from '../api/axios';
import { userTokenAtom, usernameAtom } from '../store/mainpageStore';

export const KakaoCallback = () => {
  const [, setUserToken] = useAtom(usernameAtom);
  const [, setUserAtom] = useAtom(userTokenAtom);
  const navigate = useNavigate();

  const userInfoMutation = useMutation(userInfo, {
    onSuccess: (data) => {
      setUserToken(true);
      setUserAtom(data.data);
      navigate('/');
      // console.log(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const kakaoLoginMutation = useMutation(kakaoLoginApi, {
    onSuccess: (data) => {
      userInfoMutation.mutate();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    kakaoLoginMutation.mutate(
      new URL(document.location.toString()).searchParams.get('code') as string
    );
  }, []);

  return <div className="h-screen f-jic">카카오 로그인중입니다</div>;
};
