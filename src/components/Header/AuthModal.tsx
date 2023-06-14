import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import {
  isOpenAuthModalAtom,
  isOpenLoginModalAtom,
} from '../../store/modalStore';
import { Logo } from '../../assets/svgs/Logo';
import { KakaoLoginBtn } from '../login/LoginModal';
import { CancelButton } from '../common/CancelButton';

export const AuthModal = () => {
  const navigate = useNavigate();
  const [, setIsOpenAuth] = useAtom(isOpenAuthModalAtom);
  const [, setIsOpenLogin] = useAtom(isOpenLoginModalAtom);

  return (
    <div className="relative f-ic-col px-9 py-14 w-[450px] bg-white rounded-3xl justify-center items-center text-center">
      <div className="absolute right-2 top-2">
        <CancelButton onClose={() => setIsOpenAuth(false)} />
      </div>
        <Logo logoSize="200" />
      <div className="text-2xl font-bold mt-8">따로 또 같이, 함께하는 혼술</div>
      <div className="mt-1 text-xl font-semibold text-[#555555]">
        로그인하고 혼술 같이해요 !
      </div>
      <button
        type="button"
        className="py-2.5 mb-2 mt-10 w-full bg-primary-300 rounded-lg text-white text-lg font-bold hover:bg-primary-400"
        onClick={() => {
          setIsOpenAuth(false);
          setIsOpenLogin(true);
        }}
      >
        이메일로 로그인
      </button>
      <button
        type="button"
        onClick={KakaoLoginBtn}
        className="py-2.5 w-full bg-[#FEE500] rounded-lg text-[#242424] text-lg font-bold hover:bg-opacity-80"
      >
        카카오톡으로 로그인
      </button>
      <div
        role="none"
        className="cursor-pointer text-base mt-4 text-[#7B7B7B] font-semibold hover:text-[black]"
        onClick={() => {
          navigate('/signup');
          setIsOpenAuth(false);
        }}
      >
        회원가입하기
      </div>
    </div>
  );
};
