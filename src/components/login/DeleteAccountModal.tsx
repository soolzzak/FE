import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteAccount, deleteKakaoAccount } from '../../api/auth';
import { userTokenAtom } from '../../store/mainpageStore';
import { isOpenDeleteAccountAtom } from '../../store/modalStore';
import { CancelButton } from '../common/CancelButton';

export const DeleteAccount = ({ kakaoId }: { kakaoId: string | null }) => {
  const navigate = useNavigate()
  const [password, setPassword] = useState<string>();
  const [inputTab, setInputTab] = useState<boolean>(false);
  const [,setUserInfo] = useAtom(userTokenAtom);
  const [, setIsOpenDeleteAccount] = useAtom(isOpenDeleteAccountAtom);
  const deleteAccountMutation = useMutation(deleteAccount, {
    onSuccess: () => {
      toast.success('회원정보가 삭제되었습니다');
      setUserInfo(undefined);
      Cookies.remove('refreshKey');
      Cookies.remove('accessKey');
      setIsOpenDeleteAccount(false);
      navigate('/');
    },
    onError: (err: any) => {
      if (err.response.data.message === "Incorrect administrator password input.") {
        toast.error("비밀번호가 일치하지 않습니다")
      }
    }
  });

  const deleteKakaoAccountMutation = useMutation(deleteKakaoAccount, {
    onSuccess: () => {
      toast.success('회원정보가 삭제되었습니다');
      setUserInfo(undefined);
      Cookies.remove('refreshKey');
      Cookies.remove('accessKey');
      setIsOpenDeleteAccount(false);
      navigate('/');
    },
  });

  const deleteAccountHandler = async () => {
    if (kakaoId) {
      await deleteKakaoAccountMutation.mutate();
    } else {
      setInputTab(true);
    }
  };

  const pwcheckHandler = async () => {
    if(!password) {
      toast.error('비밀번호를 입력해주세요')
    }
    const passwordInfo = {
      password,
    }
    await deleteAccountMutation.mutate(passwordInfo)
  };

  return (
    <div className="relative w-full h-full bg-white f-jic-col items-center rounded-2xl px-12 py-8">
      <div
        role="none"
        onClick={() => setIsOpenDeleteAccount(false)}
        className="absolute -top-2 -right-2"
      >
        <CancelButton />
      </div>

      {!inputTab && (
        <div className="text-2xl font-semibold pb-1 text-center">
          정말 탈퇴하시겠어요?
        </div>
      )}
      {inputTab && (
        <div className="text-2xl font-bold pb-1 text-center">
          회원탈퇴를 위해
          <br />
          비밀번호를 입력해주세요.
        </div>
      )}

      {inputTab && (
        <input 
        className='w-[320px] h-11 border border-[#969696] rounded-lg indent-2 placeholder:indent-2 my-3'
        placeholder='비밀번호를 입력해주세요.'
        type='password'
        value={password || ''}
        onChange={(e) => setPassword(e.target.value)}
        />
      )}

      <div className={`${inputTab?'text-sm py-1':'text-base pb-6'} w-full font-semibold text-[#969696] text-center`}>
        탈퇴하시면 회원님의 모든 정보와 기록이 사라집니다.
      </div>

      {!inputTab && (
        <div className="flex gap-4">
          <div
            role="none"
            onClick={() => setIsOpenDeleteAccount(false)}
            className="f-jic w-36 h-11 text-base font-semibold text-[#6A6A6A] rounded-lg border border-[#6A6A6A] text-center hover:text-[#dcdcdc] hover:cursor-pointer"
          >
            취소
          </div>
          <div
            role="none"
            onClick={deleteAccountHandler}
            className="f-jic w-36 h-11 text-base font-semibold text-[#FF4444] rounded-lg border border-[#FF4444] bg-[#FFF0F0] text-center hover:bg-[#FF4444] hover:text-[#FFF0F0] transition-colors duration-200 ease-in-out hover:cursor-pointer"
          >
            탈퇴
          </div>
        </div>
      )}

      {inputTab && <button type='button' onClick={pwcheckHandler} className='w-full h-12 rounded-lg text-white text-lg font-semibold bg-[#FF4444] hover:opacity-90'>회원탈퇴</button>}
    </div>
  );
};
