import { useState } from 'react';
import { useInput } from '../hooks/useInput';
import { useMutation } from 'react-query';
import { SignupApi } from '../../api/auth';
import { SignupInfo } from '../../api/auth';
import { Checkbox } from '../../assets/svgs/Checkbox';

export const SignupInput = () => {
  //1. email
  const [
    email,
    emailErrorMsg,
    onEmailChangeHandler,
    ,
    emailTypeCheckHandler,
    ,
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
  ] = useInput();
  const passwordType =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;
  const passwordMsg = '8~16자 영문, 숫자, 특수문자를 사용하세요';

  //3. 비밀번호 확인
  const [pwcheck, pwcheckErrorMsg, onPwcheckChangeHandler, , , pwcheckHandler] =
    useInput();

  //4. 닉네임
  const [
    username,
    usernameErrorMsg,
    usernameChangeHandler,
    usernameCheckHandler,
    ,
    ,
  ] = useInput();

  //5. 생일
  const monthList = ['월', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  type BirthdayTypes = {
    year: number | undefined;
    month: number | undefined;
    day: number | undefined;
  };
  const [birthday, setBirthday] = useState<BirthdayTypes>({
    year: undefined,
    month: undefined,
    day: undefined,
  });
  const birthdayCombined =
    birthday.year + '-' + birthday.month + '-' + birthday.day;
  const [birthdayErrMsg, setBirthdayErrMsg] = useState<string | undefined>();
  const birthdayHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday({
      ...birthday,
      [event.target.name]: event.target.value,
    });
  };
  const birthdayselectHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBirthday({
      ...birthday,
      [event.target.name]: event.target.value,
    });
  };
  const birthdayCheckHandler = () => {
    if (!(birthday.year && birthday.month && birthday.day)) {
      setBirthdayErrMsg('필수정보 입니다');
    } else {
      setBirthdayErrMsg('');
    }
  };

  //6. 성별
  const genderList = ['성별', '남성', '여성'];
  const [gender, setGender] = useState<string | undefined>();
  const [genderErrMsg, setGenderMsg] = useState<string | undefined>();
  const genderHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };
  const genderCheckHandler = () => {
    if (!gender) {
      setGenderMsg('필수정보 입니다');
    } else {
      setGenderMsg('');
    }
  };

  //7. 관리자
  const [admin, setAdmin] = useState(false);
  const [adminkey, setAdminkey] = useState<string | undefined>();
  const [adminkeyErrMsg, setAdminkeyErrMsg] = useState<string | undefined>();
  const adminHandler = () => setAdmin(!admin);
  const adminKeyHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAdminkey(event.target.value);
  const adminKeyCheckHandler = () => {
    if (!adminkey) {
      setAdminkeyErrMsg('필수정보 입니다');
    } else {
      setAdminkeyErrMsg('');
    }
  };

  //6. 전송
  const signupMutation = useMutation(SignupApi);
  const submitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (admin && !adminkey) {
      return;
    } else if (
      !email ||
      !emailType.test(email) ||
      !password ||
      !passwordType.test(password) ||
      !pwcheck ||
      !username ||
      !(birthday.year && birthday.month && birthday.day) ||
      !gender
    ) {
      return;
    }
    const userInfo: SignupInfo = {
      username,
      password,
      email,
      birthday: birthdayCombined,
      gender,
      admin,
      adminkey,
    };
    await signupMutation.mutate(userInfo);
  };

  return (
    <form onSubmit={submitHandler}>
      <p className="font-bold text-base mb-2">이메일</p>
      <div className='relative'>
      <input
        type="text"
        value={email}
        onChange={onEmailChangeHandler}
        onBlur={() => emailTypeCheckHandler(emailType, emailMsg)}
        className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292] pl-2 placeholder:text-[16px] placeholder:align-middle"
        placeholder="example@naver.com"
      />
      <span className="absolute w-[65px] h-[31px] top-[6.5px] right-2 bg-[#E6E6E6] rounded text-[14px] text-[#383434] text-center flex justify-center items-center cursor-pointer">
        중복확인
      </span>
      </div>
      <div className="text-xs text-red-600 mt-1 mb-4 pl-1">{emailErrorMsg}</div>

      <p className="font-bold text-base mb-2">비밀번호</p>
      <input
        type="password"
        value={password}
        onChange={onPasswordChangeHandler}
        onBlur={() => passwordTypeCheckHandler(passwordType, passwordMsg)}
        className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292] indent-2 placeholder:text-[16px]"
        placeholder="비밀번호"
      />
      <div className="text-xs text-red-600 mt-1 mb-4 pl-1">
        {passwordErrorMsg}
      </div>

      <p className="font-bold text-base mb-2">비밀번호 확인</p>
      <input
        type="password"
        value={pwcheck}
        onChange={onPwcheckChangeHandler}
        onBlur={() => pwcheckHandler(password)}
        className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292] indent-2"
      />
      <div className="text-xs text-red-600 mt-1 mb-4 pl-1">
        {pwcheckErrorMsg}
      </div>

      <p className="font-bold text-base mb-2">닉네임</p>
      <div className='relative'>
      <input
        type="text"
        value={username}
        onChange={usernameChangeHandler}
        onBlur={usernameCheckHandler}
        className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292] indent-2"
      />
      <span className="absolute w-[65px] h-[31px] top-[6.5px] right-2 bg-[#E6E6E6] rounded text-[14px] text-[#383434] text-center flex justify-center items-center cursor-pointer">
        중복확인
      </span>
      </div>
      <div className="text-xs text-red-600 mt-1 mb-4 pl-1">
        {usernameErrorMsg}
      </div>

      <p className="font-bold text-base mb-2">생년월일</p>
      <div className="flex justify-between">
        <input
          type="text"
          name="year"
          className="box-border w-[112px] h-[45px] rounded-lg border border-[#929292] indent-2 placeholder:text-[16px]"
          value={birthday.year}
          minLength={4}
          maxLength={4}
          onChange={birthdayHandler}
          onBlur={birthdayCheckHandler}
          placeholder="년(4자)"
        />

        <select
          name="month"
          className="box-border w-[112px] h-[45px] rounded-lg border border-[#929292] indent-2 text-[16px]"
          onChange={birthdayselectHandler}
          value={birthday.month}
          onBlur={birthdayCheckHandler}
        >
          {monthList.map((item, i) => {
            return (
              <option
                key={i}
                value={item}
                selected={item === '월'}
                disabled={item === '월'}
                hidden={item === '월'}
              >
                {item}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="day"
          className="box-border w-[112px] h-[45px] rounded-lg border border-[#929292] indent-2 placeholder:text-[16px]"
          onChange={birthdayHandler}
          onBlur={birthdayCheckHandler}
          placeholder="일"
        />
      </div>
      <div className="text-xs text-red-600 mt-1 mb-4 pl-1">
        {birthdayErrMsg}
      </div>

      <p className="font-bold text-base mb-2">성별</p>
      <select
        onChange={genderHandler}
        onBlur={genderCheckHandler}
        className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292] indent-2 text-[16px]"
      >
        {genderList.map((item, i) => {
          return (
            <option
              key={i}
              value={item}
              selected={item === '성별'}
              disabled={item === '성별'}
              hidden={item === '성별'}
            >
              {item}
            </option>
          );
        })}
      </select>
      <div className="text-xs text-red-600 mt-1 mb-4 pl-1">{genderErrMsg}</div>

      <div className="flex flex-col">
        <div className="flex">
          <div className='pt-1'>
            <Checkbox onClick={adminHandler} props={admin} />
          </div>
          <span className="font-bold text-base mb-2">관리자</span>
        </div>

        {admin ? (
          <input
            type="password"
            onChange={adminKeyHandler}
            onBlur={adminKeyCheckHandler}
            maxLength={4}
            className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292] pl-2 placeholder:text-[16px] mt-2"
          />
        ) : null}
      </div>
      {admin ? (
        <div className="text-xs text-red-600 mt-1 mb-4 pl-1">
          {adminkeyErrMsg}
        </div>
      ) : null}

      <button className="w-[356px] h-[45px] rounded-lg font-bold text-[#FFFFFF] text-[18px] bg-[#BCBCBC] mt-5">
        회원가입하기
      </button>
    </form>
  );
};
