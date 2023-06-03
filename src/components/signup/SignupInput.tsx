import { useState } from 'react';
import { useMutation } from 'react-query';
import { SignupApi, SignupInfo } from '../../api/auth';
import  {Checkbox}  from '../../assets/svgs/Checkbox';
import { useInput } from '../../hooks/useInput';

export const SignupInput = () => {
  const [email,emailErrorMsg,onEmailChangeHandler,,emailTypeCheckHandler,,] = useInput();
  const emailType = /^[a-zA-Z0-9+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const emailMsg = 'example@example.com 형식으로 작성하세요';

  const [password,passwordErrorMsg,onPasswordChangeHandler,,passwordTypeCheckHandler,,] = useInput();
  const passwordType = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,16}$/;
  const passwordMsg = '8~16자 영문, 숫자, 특수문자를 사용하세요';

  const [pwcheck, pwcheckErrorMsg, onPwcheckChangeHandler, , , pwcheckHandler] =useInput();

  const [username,usernameErrorMsg,usernameChangeHandler,usernameCheckHandler,,,] = useInput();

  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
  const today = new Date();
  const calcBirthday = new Date(
    Number(birthday.year),
    Number(birthday.month),
    Number(birthday.day)
  );
  const [birthdayErrMsg, setBirthdayErrMsg] = useState<string | undefined>();
  let age = today.getFullYear() - calcBirthday.getFullYear();
  const getM = today.getMonth() - calcBirthday.getMonth();

  const birthdayHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday({
      ...birthday,
      [event.target.name]: event.target.value,
    });
  };
  const birthdayCheckHandler = () => {
    if (!(birthday.year && birthday.month && birthday.day)) {
      setBirthdayErrMsg('필수정보 입니다');
    } else if (
      getM < 0 ||
      (getM === 0 && today.getDate() < calcBirthday.getDate())
    ) {
      age -= 1;
      if (age < 19) {
        setBirthdayErrMsg('애들은 가라');
      } else {
        setBirthdayErrMsg('');
      }
    } else {
      setBirthdayErrMsg('');
    }
  };
  const birthdayselectHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBirthday({
      ...birthday,
      [event.target.name]: event.target.value,
    });
  };

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

  const [admin, setAdmin] = useState(false);
  const [adminkey, setAdminkey] = useState<string | null>(null);
  const [adminkeyErrMsg, setAdminkeyErrMsg] = useState<string | undefined>();
  const adminKeyHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAdminkey(event.target.value);
  const adminKeyCheckHandler = () => {
    if (!adminkey) {
      setAdminkeyErrMsg('필수정보 입니다');
    } else {
      setAdminkeyErrMsg('');
    }
  };

  const signupMutation = useMutation(SignupApi);
  const submitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (admin && !adminkey) {
      return;
    } 
    if (
      !email ||
      !emailType.test(email) ||
      !password ||
      !passwordType.test(password) ||
      !pwcheck ||
      !username ||
      !(birthday.year && birthday.month && birthday.day) ||
      age < 19 ||
      !gender
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

  console.log(gender)

  return (
    <form onSubmit={submitHandler}>
      <p className="font-bold text-base mb-2">이메일</p>
      <div className="relative">
        <input
          type="text"
          value={email || ''}
          onChange={onEmailChangeHandler}
          onBlur={() => emailTypeCheckHandler(emailType, emailMsg)}
          className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292] pl-2 placeholder:text-[16px] placeholder:align-middle"
          placeholder="example@naver.com"
        />
        <span className="absolute w-[65px] h-[31px] top-[6.5px] right-2 bg-[#E6E6E6] rounded text-[14px] text-[#383434] text-center flex justify-center items-center cursor-pointer hover:bg-opacity-80">
          인증하기
        </span>
      </div>
      <div className="text-xs text-red-600 mt-1 mb-4 pl-1">{emailErrorMsg}</div>

      <p className="font-bold text-base mb-2">비밀번호</p>
      <input
        type="password"
        value={password || ''}
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
        value={pwcheck || ''}
        onChange={onPwcheckChangeHandler}
        onBlur={() => pwcheckHandler(password)}
        className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292] indent-2"
      />
      <div className="text-xs text-red-600 mt-1 mb-4 pl-1">
        {pwcheckErrorMsg}
      </div>

      <p className="font-bold text-base mb-2">닉네임</p>
      <div className="relative">
        <input
          type="text"
          value={username || ''}
          onChange={usernameChangeHandler}
          onBlur={usernameCheckHandler}
          className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292] indent-2"
        />
        <span className="absolute w-[65px] h-[31px] top-[6.5px] right-2 bg-[#E6E6E6] rounded text-[14px] text-[#383434] text-center flex justify-center items-center cursor-pointer hover:bg-opacity-80">
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
          className="box-border w-[112px] h-[45px] rounded-lg border border-[#929292] indent-2 placeholder:text-[16px] text-[16px]"
          value={birthday.year || ''}
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
          value={birthday.month || ''}
          onBlur={birthdayCheckHandler}
        >
          <option value="default" hidden>
            월
          </option>
          {monthList.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
        </select>
        <input
          type="text"
          name="day"
          value={birthday.day || ''}
          min="1"
          max="31"
          className="box-border w-[112px] h-[45px] rounded-lg border border-[#929292] indent-2 placeholder:text-[16px] text-[16px]"
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
        value={gender || ''}
        className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292] indent-2 text-[16px]"
      >
        <option value="gender" hidden>
          성별
        </option>
        <option value="MALE">남성</option>
        <option value="FEMALE">여성</option>
      </select>
      <div className="text-xs text-red-600 mt-1 mb-4 pl-1">{genderErrMsg}</div>

      <div className="flex flex-col">
        <div className="flex">
          <div className="pt-1">
            
            <Checkbox admin={admin} setAdmin={setAdmin} />
          </div>
          <span className="font-bold text-base mb-2">관리자</span>
        </div>

        {admin ? (
          <input
            type="password"
            onChange={adminKeyHandler}
            onBlur={adminKeyCheckHandler}
            value={adminkey || ''}
            maxLength={4}
            placeholder="관리자 비밀번호를 입력해주세요"
            className="box-border w-[356px] h-[45px] rounded-lg border border-[#929292] pl-2 placeholder:text-[16px] mt-2"
          />
        ) : null}
      </div>
      {admin ? (
        <div className="text-xs text-red-600 mt-1 mb-4 pl-1">
          {adminkeyErrMsg}
        </div>
      ) : null}

      <button type='submit' className="w-[356px] h-[45px] rounded-lg font-bold text-[#FFFFFF] text-[18px] bg-[#BCBCBC] mt-5 hover:bg-opacity-80">
        회원가입하기
      </button>
    </form>
  );
};
