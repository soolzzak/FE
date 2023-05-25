import { useState } from 'react';
import { useInput } from '../components/hooks/useInput';
import { useMutation } from 'react-query';
import { SignupApi } from '../api/auth';
import { SignupInfo } from '../api/auth';

export const Signup = () => {
  //1. email
  const [
    email,
    emailErrorMsg,
    onEmailChangeHandler,
    ,
    emailTypeCheckHandler,
    ,
    resetEmail,
  ] = useInput();
  const emailType = /^[a-zA-Z0-9+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const emailMsg = 'example@example.com 형식으로 작성하세요';

  //2. 비밀번호
  const [
    password,
    passwordErrorMsg,
    onPasswordChangeHandler,
    ,
    passwordTypeCheckHandler,
    ,
    resetPassword,
  ] = useInput();
  const passwordType =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;
  const passwordMsg = '8~16자 영문, 숫자, 특수문자를 사용하세요';

  //3. 비밀번호 재확인
  const [
    pwcheck,
    pwcheckErrorMsg,
    onPwcheckChangeHandler,
    ,
    ,
    pwcheckHandler,
    resetPwcheck,
  ] = useInput();

  //4. 닉네임
  const [
    username,
    usernameErrorMsg,
    usernameChangeHandler,
    usernameCheckHandler,
    ,
    ,
    resetUsername,
  ] = useInput();

  //5. 관리자 권한 - 수정필요(관리자 번호는 어떻게???)
  const [adminCheck, setAdminCheck] = useState(false);
  const [adminpw, setAdminpw] = useState<string>();
  const adminCheckHandler = () => setAdminCheck(!adminCheck);
  const adminpwChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAdminpw(event.target.value);

  //6. 전송
  const signupMutation = useMutation(SignupApi);
  const submitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !email ||
      !emailType.test(email) ||
      !password ||
      !passwordType.test(password) ||
      !pwcheck ||
      !username
    ) {
      return;
    }
    const userInfo: SignupInfo = {
      username,
      password,
      email,
      logintype: '', //수정필요
      isAdmin: false, //수정필요
    };
    await signupMutation.mutate(userInfo);
    resetEmail();
    resetPassword();
    resetPwcheck();
    resetUsername();
    setAdminCheck(false);
    setAdminpw('');
  };
  return (
    <div className="w-[764px] flex flex-col border border-[#929292] items-center justify-center">
      <div>
        <p className="text-[25px] font-semibold leading-[30px] text-[#3E3E3E] text-center">
          logo
        </p>
        <span className="text-[20px] font-bold leading-[24px] text-[#373737] text-center">
          회원가입
        </span>
      </div>
      <form onSubmit={submitHandler}>
        <p className="font-bold text-base">이메일</p>
        <input
          type="text"
          value={email}
          onChange={onEmailChangeHandler}
          onBlur={() => emailTypeCheckHandler(emailType, emailMsg)}
          className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292] pl-2"
          placeholder="example@naver.com"
        />
        {/* <span>중복확인</span> */}
        <div className="text-xs text-red-600 mt-1 mb-4 pl-1">
          {emailErrorMsg}
        </div>

        <p className="font-bold text-base">비밀번호</p>
        <input
          type="password"
          value={password}
          onChange={onPasswordChangeHandler}
          onBlur={() => passwordTypeCheckHandler(passwordType, passwordMsg)}
          className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292]"
        />
        <div className="text-xs text-red-600 mt-1 mb-4 pl-1">
          {passwordErrorMsg}
        </div>

        <p className="font-bold text-base">비밀번호 확인</p>
        <input
          type="password"
          value={pwcheck}
          onChange={onPwcheckChangeHandler}
          onBlur={() => pwcheckHandler(password)}
          className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292]"
        />
        <div className="text-xs text-red-600 mt-1 mb-4 pl-1">
          {pwcheckErrorMsg}
        </div>

        <p className="font-bold text-base">닉네임</p>
        <input
          type="text"
          value={username}
          onChange={usernameChangeHandler}
          onBlur={usernameCheckHandler}
          className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292]"
        />
        <div className="text-xs text-red-600 mt-1 mb-4 pl-1">
          {usernameErrorMsg}
        </div>

        
          <div className="flex flex-row">
            <input
              type="checkbox"
              checked={adminCheck}
              onChange={adminCheckHandler}
              className=""
            />
{/* <img src='/img/checkbox.svg' onClick={adminCheck} onChange={adminCheckHandler}/> */}
            <span className="font-bold text-base">관리자</span>
            </div>
          {adminCheck ? (
            <input
              type="password"
              onChange={adminpwChangeHandler}
              maxLength={4}
              className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292]"
            />
          ) : null}
        
        <button className="w-[356px] h-[45px] rounded-lg font-bold text-[#FFFFFF] text-[18px] bg-[#BCBCBC]">
          회원가입하기
        </button>
      </form>
    </div>
  );
};
