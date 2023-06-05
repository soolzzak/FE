import { useNavigate } from 'react-router-dom';

export const AuthModal = ({
  setIdOpenLogin,
}: {
  setIdOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  return (
    <div className="f-ic-col px-14 w-[470px] h-[494px] bg-white rounded-2xl ">
      <div className="rounded-full mt-16 w-28 h-28 bg-[#D9D9D9]" />
      <div className="text-2xl font-bold mt-8">따로 또 같이, 함께하는 혼술</div>
      <div className="mt-3 text-xl font-semibold text-[#555555]">
        로그인하고 혼술 같이해요 !
      </div>
      <button
        type="button"
        className="mb-2 mt-10 h-11 w-full bg-[#BCBCBC] rounded-lg text-white text-lg font-bold"
        onClick={() => {
          setIdOpenLogin(true);
          navigate('/login');
        }}
      >
        이메일로 로그인
      </button>
      <button
        type="button"
        className="h-11 w-full bg-[#9A9A9A] rounded-lg text-white text-lg font-bold"
      >
        카카오톡으로 로그인
      </button>
      <div
        role="none"
        className="cursor-pointer text-base mt-4"
        onClick={() => navigate('/signup')}
      >
        회원가입하기
      </div>
    </div>
  );
};
