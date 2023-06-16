import { useAtom } from 'jotai';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { ChangePassword, ChangePwdInfo, EmailLoginConfirm } from '../../api/auth';
import { isOpenLoginModalAtom } from '../../store/modalStore';

export const ChangePwdInput = () => {
  const [,setIsOpenLogin] = useAtom(isOpenLoginModalAtom);
  const [email, setEmail] = useState<string | undefined>();
  const [pwd, setPwd] = useState<string | undefined>();
  const [pwdCheck, setPwdCheck] = useState<string | undefined>();
  const [authNumber, setAuthNumber] = useState<string | undefined>();
  const [authNumberErrMsg, setAuthNumberErrMsg] = useState<string | undefined>();
  const [pwdErrMsg, setPwdErrMsg] = useState<string | undefined>();
  const pwdType = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const pwdChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setPwd(event.target.value);
  const pwdCheckChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setPwdCheck(event.target.value);
  const pwdTypeHandler = (input: string | undefined) => {
    if(!!input && !pwdType.test(input)) {
        setPwdErrMsg('8~16자 영문, 숫자, 특수문자를 사용하세요')
    } else {
        setPwdErrMsg('')
    }
  }
  const authNumberChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setAuthNumber(event.target.value);

  const EmailMutation = useMutation(EmailLoginConfirm,{
    onSuccess: () => {
      toast.success('인증번호가 발송되었습니다');
    },
    onError: (error:any) => {
      if (error.response.data.message === 'Failed to send the verification email.') {
        toast.error('올바른 이메일 형식을 입력하세요')
      }
    }
  });
  const confirmEmailHandler = async () => {
    if (!email) {
      return;
    }
    const emailInput = {
      email,
    };
    await EmailMutation.mutate(emailInput);
  };

  const authNumberCheckHandler = () => {
    if (authNumber !== EmailMutation.data) {
        setAuthNumberErrMsg('일치하지 않는 인증번호 입니다')
    } else {
        setAuthNumberErrMsg('')
    }
  }

  const changePasswordMutation = useMutation(ChangePassword, {
    onSuccess: () => {
      toast.success('비밀번호가 변경되었습니다')
      setIsOpenLogin(true);
    },
    onError: (error:any) => {
      if (error.response.data.message === 'The email address does not exist.') {
        toast.error('존재하지 않는 이메일 입니다')
      } else if (error.response.data.message === 'Please reset your password. Passwords must be 8-15 characters long and contain a combination of lowercase letters, uppercase letters, numbers, and special characters.') {
        toast.error('비밀번호 형식을 올바르게 입력하세요')
      }
    }
  }
    );
  const submitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !pwd || !pwdCheck || authNumber !== EmailMutation.data) {
        return;
    }

    const changePwdInfo: ChangePwdInfo = {
        email,
        password: pwd,
    };
    await changePasswordMutation.mutate(changePwdInfo)
  }

  return (
    <form onSubmit={submitHandler}>
      <p className="font-bold text-lg mb-2">이메일 인증</p>
      <div className="relative">
        <input
          type="text"
          value={email || ''}
          onChange={emailChangeHandler}
          placeholder="example@naver.com"
          className="signupInput"
        />
        <button
          type="button"
          onClick={confirmEmailHandler}
          className="absolute w-16 h-7 top-2 right-2 bg-primary-100 rounded font-bold text-[14px] text-primary-300 text-center flex justify-center items-center cursor-pointer hover:bg-opacity-80"
        >
          인증번호
        </button>
      </div>

      
      {EmailMutation.data?.length === 6? (
        <>
        <p className="font-bold text-lg mb-2 mt-4">인증번호</p>
        <input
          type="password"
          value={authNumber || ''}
          onChange={authNumberChangeHandler}
          onBlur={authNumberCheckHandler}
          placeholder="인증번호 6자리를 입력해주세요"
          className="signupInput"
        />
        </>
      ) : null}

        <div className="text-base text-red-600 mb-4 pl-1">
        {authNumberErrMsg}
        </div>

      <p className="font-bold text-lg mb-2">비밀번호 변경</p>
      <div>
        <input
          type="password"
          value={pwd || ''}
          onChange={pwdChangeHandler}
          onBlur={() => pwdTypeHandler(pwd)}
          className="signupInput"
          placeholder="8~16자 영문, 숫자, 특수문자를 사용하세요"
        />
        <div className="text-base text-red-600 mt-1 mb-4 pl-1">
        {pwdErrMsg}
        </div>
      </div>

      <p className="font-bold text-lg mb-2">비밀번호 확인</p>
      <div>
        <input
          type="password"
          value={pwdCheck || ''}
          onChange={pwdCheckChangeHandler}
          className="signupInput"
        />
        <div className="text-base text-red-600 mt-1 mb-4 pl-1">
        {pwdCheck && pwd !== pwdCheck? '비밀번호가 일치하지 않습니다' : null}
        </div>
      </div>

      <button
        type="submit"
        className="w-96 h-11 rounded-lg font-bold text-white text-lg bg-primary-300 mt-5 hover:bg-primary-400"
      >
        비밀번호 변경
      </button>
    </form>
  );
};
