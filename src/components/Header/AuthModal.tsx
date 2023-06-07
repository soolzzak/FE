import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { isOpenAuthModalAtom, isOpenLoginModalAtom } from '../../store/modalStore';
import { Logo } from '../../assets/svgs/Logo';
import { KakaoLoginBtn } from '../login/KakaoLogin';

export const AuthModal = () => {
  const navigate = useNavigate();
  const [,setIsOpenAuth] = useAtom(isOpenAuthModalAtom);
  const [,setIsOpenLogin] = useAtom(isOpenLoginModalAtom);
  return (
    <div className="f-ic-col px-14 w-[470px] h-[625px] bg-white rounded-2xl justify-center items-center text-center">
      <Logo logoSize='150' />
      <div className="text-2xl font-bold mt-8">따로 또 같이, 함께하는 혼술</div>
      <div className="mt-3 text-xl font-semibold text-[#555555]">
        로그인하고 혼술 같이해요 !
      </div>
      <button
        type="button"
        className="mb-2 mt-10 h-11 w-full bg-primary-300 rounded-lg text-white text-lg font-bold hover:bg-[#FF5500]"
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
        className="h-11 w-full bg-[#FEE500] rounded-lg text-[#242424] text-lg font-bold hover:bg-opacity-80"
      >
        카카오톡으로 로그인
      </button>
      <div
        role="none"
        className="cursor-pointer text-base mt-4 text-[#7B7B7B] font-semibold cursor-pointer hover:text-[black]"
        onClick={() => 
          {navigate('/signup');
          setIsOpenAuth(false);
        }
        }
      >
        회원가입하기
      </div>
    </div>
  );
};
