import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  EmailSignupConfirm,
  SignupApi,
  SignupInfo,
  UsernameConfirm,
} from '../../api/auth';
import { Checkbox } from '../../assets/svgs/Checkbox';
import { useError } from '../../hooks/useError';
import { useInput } from '../../hooks/useInput';
import { isOpenLoginModalAtom } from '../../store/modalStore';
import { SignupInputForm } from './SignupInputForm';

type BirthdayTypes = {
  year: number | undefined;
  month: number | undefined;
  day: number | undefined;
};

export const SignupInput = () => {
  const navigate = useNavigate();
  const [, setIsOpenLogin] = useAtom(isOpenLoginModalAtom);
  const [email, emailHandler] = useInput();
  const [emailNumber, setEmailNumber] = useState<string | undefined>();
  const [password, passwordHandler] = useInput();
  const [pwcheck, pwcheckHandler] = useInput();
  const [username, usernameHandler] = useInput();
  const [birthday, setBirthday] = useState<BirthdayTypes>({
    year: undefined,
    month: undefined,
    day: undefined,
  });
  const [gender, setGender] = useState<string | undefined>();
  const [admin, setAdmin] = useState(false);
  const [adminkey, setAdminkey] = useState<string | null>(null);

  const [emailErrMsg, setEmailErrMsg] = useState<string | undefined>();
  const [emailNumberErr, setEmailNumberErr] = useState<string | undefined>();
  const [passwordErrMsg, setPasswordErrMsg] = useState<string | undefined>();
  const [pwcheckErrMsg, setPwcheckErrMsg] = useState<string | undefined>();
  const [usernameErr, usernameErrHandler] = useError();
  const [birthdayErrMsg, setBirthdayErrMsg] = useState<string | undefined>();
  const [genderErr, genderErrHandler] = useError();
  const [adminkeyErr, setAdminkeyErrMsg] = useState<string | undefined>();

  const emailType =
    /^[a-zA-Z0-9+-]+([._][a-zA-Z0-9+-]+)*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const emailTypeHandler = (input: string | undefined) => {
    if (!input) {
      setEmailErrMsg('필수정보 입니다');
    } else if (!!input && !emailType.test(input)) {
      setEmailErrMsg('올바른 이메일 형식을 입력하세요');
    } else {
      setEmailErrMsg('');
    }
  };

  const passwordType =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;
  const passwordTypeHandler = (input: string | undefined) => {
    if (!input) {
      setPasswordErrMsg('필수정보 입니다');
    } else if (!!input && !passwordType.test(input)) {
      setPasswordErrMsg('8~16자 영문, 숫자, 특수문자를 사용하세요');
    } else {
      setPasswordErrMsg('');
    }
  };

  const pwCheckHandler = (input: string | undefined) => {
    if (!input) {
      setPwcheckErrMsg('필수정보 입니다');
    } else if (input !== password) {
      setPwcheckErrMsg('비밀번호가 일치하지 않습니다');
    } else {
      setPwcheckErrMsg('');
    }
  };

  const birthdayHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday({
      ...birthday,
      [e.target.name]: e.target.value,
    });
  };

  const today = new Date();
  const calcBirthday = new Date(
    Number(birthday.year),
    Number(birthday.month),
    Number(birthday.day)
  );
  let ageDiff = today.getFullYear() - calcBirthday.getFullYear();

  const birthdayCheckHandler = () => {
    if (!birthday.year || !birthday.month || !birthday.day) {
      setBirthdayErrMsg('필수정보 입니다');
    } else {
      const monthDiff = today.getMonth() - calcBirthday.getMonth();
      const dayDiff = today.getDate() - calcBirthday.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        ageDiff -= 1;
      }

      if (ageDiff < 19) {
        setBirthdayErrMsg('미성년자는 서비스 이용이 제한됩니다');
      } else {
        setBirthdayErrMsg('');
      }
    }
  };

  const genderHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const adminkeyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminkey(e.target.value);
  };

  const adminkeyCheckHandler = (input: string | null) => {
    if (!input) {
      setAdminkeyErrMsg('필수정보 입니다');
    } else {
      setAdminkeyErrMsg('');
    }
  };

  const usernameMutation = useMutation(UsernameConfirm, {
    onSuccess: (response: any) => {
      if (response.data.message === 'This nickname is available') {
        toast.success('사용할 수 있는 닉네임 입니다')
      }
    },
    onError: (error: any) => {
      if(error.response.data.message === 'The username contains forbidden words. Please choose a different username.') {
        toast.error('사용할 수 없는 닉네임 입니다')
      } else if (error.response.data.message === 'The username already exist.') {
        toast.error('중복된 닉네임 입니다')
      }
    },
  });

  const confirmUsernameHandler = async () => {
    if (!username) {
      return;
    }
    await usernameMutation.mutate(username);
  };

  const EmailMutation = useMutation(EmailSignupConfirm, {
    onSuccess: () => {
      toast.success('인증번호가 발송되었습니다');
    },
    onError: (error:any) => {
      if (error.response.data.message === 'Failed to send the verification email.') {
        toast.error('올바른 이메일 형식을 입력하세요')
      } else if (error.response.data.message === 'The email address is already registered.') {
        toast.error('등록된 이메일 입니다')
      }
    },
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

  const emailNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailNumber(e.target.value);
  };

  const emailNumberCheckHandler = () => {
    if (emailNumber !== EmailMutation.data) {
      setEmailNumberErr('일치하지 않는 인증번호 입니다');
    } else {
      setEmailNumberErr('');
    }
  };

  const signupMutation = useMutation(SignupApi, {
    onSuccess: () => {
      toast.success('혼술짝 회원이 되신것을 환영합니다');
      navigate('/');
      setIsOpenLogin(true);
    },
    onError: () => {
      toast.error('회원가입에 실패하였습니다');
    },
  });

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (admin && !adminkey) {
      return;
    }
    if (
      !email ||
      !emailType.test(email) ||
      !emailNumber ||
      emailNumber !== EmailMutation.data ||
      !password ||
      !passwordType.test(password) ||
      !pwcheck ||
      !username ||
      !birthday ||
      ageDiff < 19 ||
      !gender ||
      usernameMutation.error
    ) {
      return;
    }
    const userInfo: SignupInfo = {
      username,
      password,
      email,
      birthday: calcBirthday,
      gender,
      admin,
      adminkey,
    };
    await signupMutation.mutate(userInfo);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="relative">
          <p className="signupInputTitle">이메일</p>
          <SignupInputForm
            inputValue={email || ''}
            inputType="text"
            className="signupInput"
            placeholderText="example@naver.com"
            handleInputChange={emailHandler}
            handleValidation={() => emailTypeHandler(email)}
          />
          <button
            type="button"
            className="absolute w-16 h-7 top-11 right-3 bg-primary-100 rounded font-bold text-[14px] text-primary-300 text-center flex justify-center items-center cursor-pointer hover:bg-opacity-80"
            onClick={confirmEmailHandler}
          >
            인증하기
          </button>
        </div>
        <div className="signupError">{emailErrMsg}</div>

        {EmailMutation.data?.length === 6 ? (
          <>
            <p className="signupInputTitle">인증번호</p>
            <input
              value={emailNumber || ''}
              type="password"
              className="signupInput"
              placeholder="인증번호를 입력해주세요"
              onChange={emailNumberHandler}
              onBlur={emailNumberCheckHandler}
            />
            <div className="signupError">{emailNumberErr}</div>
          </>
        ) : null}

        <p className="signupInputTitle">비밀번호</p>
        <SignupInputForm
          inputValue={password || ''}
          inputType="password"
          className="signupInput"
          placeholderText="8~16자 영문, 숫자, 특수문자를 사용하세요"
          handleInputChange={passwordHandler}
          handleValidation={() => passwordTypeHandler(password)}
        />
        <div className="signupError">{passwordErrMsg}</div>

        <p className="signupInputTitle">비밀번호 확인</p>
        <SignupInputForm
          inputValue={pwcheck || ''}
          inputType="password"
          className="signupInput"
          placeholderText=""
          handleInputChange={pwcheckHandler}
          handleValidation={() => pwCheckHandler(pwcheck)}
        />
        <div className="signupError">{pwcheckErrMsg}</div>

        <div className='relative'>
          <p className="signupInputTitle">닉네임</p>
          <SignupInputForm
            inputValue={username || ''}
            inputType="text"
            className="signupInput"
            placeholderText=""
            handleInputChange={usernameHandler}
            handleValidation={() => usernameErrHandler(username)}
          />
          <button
            type="button"
            className="absolute w-16 h-7 top-11 right-3 bg-primary-100 rounded font-bold text-[14px] text-primary-300 text-center flex justify-center items-center cursor-pointer hover:bg-opacity-80"
            onClick={confirmUsernameHandler}
          >
            중복확인
          </button>
        </div>
        <div className="signupError">{usernameErr}</div>

        <p className="signupInputTitle">생년월일</p>
        <div className="flex justify-between">
          <input
            type="text"
            name="year"
            className="signupInput w-28"
            value={birthday.year || ''}
            maxLength={4}
            onChange={birthdayHandler}
            onBlur={birthdayCheckHandler}
            placeholder="년"
          />
          <input
            type="text"
            name="month"
            className="signupInput w-28"
            value={birthday.month || ''}
            maxLength={2}
            onChange={birthdayHandler}
            onBlur={birthdayCheckHandler}
            placeholder="월"
          />
          <input
            type="text"
            name="day"
            className="signupInput w-28"
            value={birthday.day || ''}
            maxLength={2}
            onChange={birthdayHandler}
            onBlur={birthdayCheckHandler}
            placeholder="일"
          />
        </div>
        <div className="signupError">{birthdayErrMsg}</div>

        <p className="signupInputTitle">성별</p>
        <select
          value={gender || ''}
          onChange={genderHandler}
          onBlur={() => genderErrHandler(gender)}
          className="signupInput"
        >
          <option value="gender" hidden>
            성별
          </option>
          <option value="MALE">남성</option>
          <option value="FEMALE">여성</option>
        </select>
        <div className="signupError">{genderErr}</div>

        <div className="flex flex-col">
          <div className="flex">
            <div className="pt-1">
              <Checkbox admin={admin} setAdmin={setAdmin} />
            </div>
            <span className="font-bold text-lg mb-2">관리자</span>
          </div>

          {admin ? (
            <input
              value={adminkey || ''}
              type="password"
              className="signupInput"
              placeholder="관리자 비밀번호를 입력해주세요"
              onChange={adminkeyHandler}
              onBlur={() => adminkeyCheckHandler(adminkey)}
            />
          ) : null}
          <div className="signupError">{adminkeyErr}</div>
        </div>

        <button
          type="submit"
          className="w-96 h-11 rounded-lg font-bold text-white text-lg bg-primary-300 mt-5 hover:bg-primary-400"
        >
          회원가입하기
        </button>
      </form>
    </div>
  );
};
