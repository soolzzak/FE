import { useAtom } from 'jotai';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { DeletePwd, deleteAccount, deleteKakaoAccount } from '../../api/auth';
import { isOpenDeleteAccountAtom } from '../../store/modalStore';
import { CancelButton } from '../common/CancelButton';

export const DeleteAccount = ({ kakaoId }: { kakaoId: string | null }) => {
  const [password, setPassword] = useState<string>();
  const [inputTab, setInputTab] = useState<boolean>(false);
  const [, setIsOpenDeleteAccount] = useAtom(isOpenDeleteAccountAtom);
  const deleteAccountMutation = useMutation(deleteAccount);
  const deleteKakaoAccountMutation = useMutation(deleteKakaoAccount);

  const deleteAccountHandler = async () => {
    if (kakaoId) {
      await deleteKakaoAccountMutation.mutate();
    } else {
      setInputTab(true);
    }
  };

  const pwcheckHandler = async () => {};

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

      {inputTab && <button type='button' className='w-full h-12 rounded-lg text-white text-lg font-semibold bg-[#FF4444] hover:opacity-90'>회원탈퇴</button>}
    </div>
  );
};
