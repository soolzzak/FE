import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { LoginApi, LoginInfo } from '../../api/auth';
import { Vector } from '../../assets/svgs/Vector';
import { usernameAtom } from '../../store/mainpageStore';
import { Logo } from '../../assets/svgs/Logo';


export const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const [, setUserToken] = useAtom(usernameAtom);

  const [errMsg, setErrMsg] = useState<string | undefined>();


  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const loginMutation = useMutation(LoginApi, {
    onSuccess: (response) => {
      onClose();
      setUserToken(response?.headers.access_key);
      navigate('/')
    },
    onError: (error) => {
      console.log(error);
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

  const KakaoLoginBtn = () => {
    const REST_API_KEY = 'b39a9a7ab117d1d1c9ca71fa61285f13';
    const REDIRECT_URI = 'https://api.honsoolzzak.com/api/login/oauth2/code/kakao&response_type=code&scope=profile_image,account_email,gender,birthday,age_range';
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = KAKAO_AUTH_URI;
  };

  return (
    <div className="w-[470px] h-[625px] rounded-[20px] bg-[#FFFFFF] flex flex-col justify-center items-center text-center">
      <Logo logoSize='150'/>
      <form onSubmit={submitHandler}>
        <p className="font-bold text-[20px] mb-7">
          따로 또 같이, 함께하는 혼술!
        </p>

        <div>
          <input
            className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292] pl-2 placeholder:text-[16px] placeholder:align-middle mb-3"
            type="text"
            value={email || ''}
            onChange={emailHandler}
            placeholder="이메일을 입력해주세요"
          />

          <input
            className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292] pl-2 placeholder:text-[16px] placeholder:align-middle mb-3"
            type="password"
            value={password || ''}
            onChange={passwordHandler}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <div className="text-lg text-red-600 mt-1 mb-4 pl-1">{errMsg}</div>
        <button
          type="submit"
          className="w-[356px] h-[45px] bg-primary-300 rounded-lg text-[18px] text-[#FFFFFF] font-bold mb-3 hover:bg-[#FF5500]"
        >
          이메일로 로그인
        </button>
      </form>
      <button
        type="button"
        className="w-[356px] h-[45px] bg-[#FEE500] rounded-lg text-[18px] text-[#242424] font-bold mb-3 hover:bg-opacity-80"
        onClick={KakaoLoginBtn}
      >
        카카오톡으로 로그인
      </button>

      <div className="flex items-center justify-center gap-2 mt-3">
        <span role='none' onClick={() => {
          navigate('/pwchange')
          onClose();
        }} className="text-[14px] text-[#7B7B7B] font-semibold cursor-pointer hover:text-[black]">
          비밀번호 찾기
        </span>
        <Vector />
        <span
          role="none"
          className="text-[14px] text-[#7B7B7B] font-semibold cursor-pointer hover:text-[black]"
          onClick={() => {
            navigate('/signup')
            onClose();
          }}
        >
          회원가입
        </span>
      </div>
    </div>
  );
};
