import { useState } from 'react';
import { useMutation } from 'react-query';
import { ChangePassword, ChangePwdInfo, EmailConfirm } from '../../api/auth';

export const ChangePwdInput = () => {
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

  const EmailMutation = useMutation(EmailConfirm);
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

  const changePasswordMutation = useMutation(ChangePassword);
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
          className="box-border w-[400px] h-[45px] rounded-lg border border-[#929292] pl-2 placeholder:text-[16px] placeholder:align-middle mb-3"
        />
        <button
          type="button"
          onClick={confirmEmailHandler}
          className="absolute w-[100px] h-[31px] top-[8.5px] right-2 bg-primary-100 rounded font-bold text-[14px] text-primary-300 text-center flex justify-center items-center cursor-pointer hover:bg-opacity-80"
        >
          인증번호 받기
        </button>
      </div>

      
      {EmailMutation.data?.length === 6? (
        <input
          type="text"
          value={authNumber || ''}
          onChange={authNumberChangeHandler}
          onBlur={authNumberCheckHandler}
          placeholder="인증번호 6자리를 입력해주세요"
          className="box-border w-[400px] h-[45px] rounded-lg border border-[#929292] pl-2 placeholder:text-[16px] placeholder:align-middle mb-3"
        />
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
          className="box-border w-[400px] h-[50px] rounded-lg border border-[#929292] indent-2 placeholder:text-[16px]"
          placeholder="비밀번호"
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
          className="box-border w-[400px] h-[50px] rounded-lg border border-[#929292] indent-2 placeholder:text-[16px]"
        />
        <div className="text-base text-red-600 mt-1 mb-4 pl-1">
        {pwdCheck && pwd !== pwdCheck? '비밀번호가 일치하지 않습니다' : null}
        </div>
      </div>

      <button
        type="submit"
        className="w-[400px] h-[50px] rounded-lg font-bold text-[#FFFFFF] text-[18px] bg-primary-300 mt-5 hover:bg-[#FF5500]"
      >
        비밀번호 변경
      </button>
    </form>
  );
};