import { useAtom } from 'jotai';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginApi, LoginInfo } from '../../api/auth';
import { Logo } from '../../assets/svgs/Logo';
import { Vector } from '../../assets/svgs/Vector';
import { usernameAtom } from '../../store/mainpageStore';
import { isOpenLoginModalAtom } from '../../store/modalStore';
import { CancelButton } from '../common/CancelButton';

export const KakaoLoginBtn = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = KAKAO_AUTH_URI;
};

export const LoginModal = () => {
  const navigate = useNavigate();
  const [, setIsOpenLogin] = useAtom(isOpenLoginModalAtom);
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const [, setUserToken] = useAtom(usernameAtom);

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const loginMutation = useMutation(LoginApi, {
    onSuccess: (response) => {
      setIsOpenLogin(false);
      toast.success('로그인 성공');
      setUserToken(response?.data.status === 200);
      navigate('/');
    },
    onError: (error: { response: { data: { message: string } } }) => {
      if (
        error.response.data.message === 'The email address does not exist.' ||
        error.response.data.message === 'The user has already left the service.'
      ) {
        toast.error('일치하는 회원정보가 없습니다');
      } else if (
        error.response.data.message === 'The passwords do not match.'
      ) {
        toast.error('비밀번호가 일치하지 않습니다');
      }
    },
  });

  const submitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    const loginInfo: LoginInfo = {
      email,
      password,
    };
    await loginMutation.mutate(loginInfo);
  };

  return (
    <div className="relative f-ic-col px-9 py-14 w-[450px] bg-white rounded-3xl justify-center items-center text-center">
      <div className="absolute right-2 top-2">
        <CancelButton onClose={() => setIsOpenLogin(false)} />
      </div>
      <Logo logoSize="200" />
      <form onSubmit={submitHandler}>
        <div className="text-2xl font-bold mt-6 mb-6">
          따로 또 같이, 함께하는 혼술!
        </div>

        <div>
          <input
            className="box-border w-full py-2 rounded-lg border border-[#929292] indent-2 placeholder:text-base placeholder:align-middle placeholder:indent-2"
            type="text"
            value={email || ''}
            onChange={emailHandler}
            placeholder="이메일을 입력해주세요"
          />

          <input
            className="box-border w-full py-2 rounded-lg border border-[#929292] indent-2 placeholder:text-base placeholder:align-middle placeholder:indent-2 mt-3"
            type="password"
            value={password || ''}
            onChange={passwordHandler}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <button type="submit" className="emailLoginButton w-full mt-5">
          로그인
        </button>
      </form>
      <button
        type="button"
        className="kakaoLoginButton w-full mt-2"
        onClick={KakaoLoginBtn}
      >
        카카오톡으로 로그인
      </button>

      <div className="flex items-center justify-center gap-2 mt-3">
        <span
          role="none"
          onClick={() => {
            navigate('/pwchange');
            setIsOpenLogin(false);
          }}
          className="text-[14px] text-[#7B7B7B] font-semibold cursor-pointer hover:text-[black]"
        >
          비밀번호 찾기
        </span>
        <Vector />
        <span
          role="none"
          className="text-[14px] text-[#7B7B7B] font-semibold cursor-pointer hover:text-[black]"
          onClick={() => {
            navigate('/signup');
            setIsOpenLogin(false);
          }}
        >
          회원가입
        </span>
      </div>
    </div>
  );
};
