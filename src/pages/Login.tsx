import { useMutation } from 'react-query';
import { useInput } from '../components/hooks/useInput';
import { LoginApi, LoginInfo } from '../api/auth';

export const Login = () => {
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
  const [password, , onPasswordChangeHandler, , , ,] = useInput();

  //3. 전송
  const loginMutation = useMutation(LoginApi);
  const submitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    const loginInfo: LoginInfo = {
      email,
      password,
      isAdmin: false,
    };
    await loginMutation.mutate(loginInfo);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>이메일</div>
        <input
          type="text"
          value={email}
          onChange={onEmailChangeHandler}
          onBlur={() => emailTypeCheckHandler(emailType, emailMsg)}
        />
        {emailErrorMsg}

        <div>비밀번호</div>
        <input
          type="password"
          value={password}
          onChange={onPasswordChangeHandler}
        />

        <button>로그인</button>
      </form>
    </>
  );
};
