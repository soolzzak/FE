import { useState } from 'react';

type ReturnTypes = [
  string | undefined,
  string | undefined,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  () => void,
  (type: RegExp, msg: string) => void,
  (checkPassword: string | undefined) => void,
]

export const useInput = (): ReturnTypes=> {
  const [inputValue, setInputValue] = useState<string | undefined>();
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const defaultCheckHandler = () => {
    if (!inputValue) {
      setErrorMsg('필수정보 입니다');
    } else {
      setErrorMsg('');
    }
  };

  const typeCheckHandler = (type: RegExp, msg: string) => {
    if (!inputValue) {
      setErrorMsg('필수정보 입니다');
    } else if (!!inputValue && !type.test(inputValue)) {
      setErrorMsg(msg);
    } else {
      setErrorMsg('');
    }
  };

  const passwordCheckHandler = (checkPassword: string | undefined) => {
    if (!inputValue) {
      setErrorMsg('필수정보 입니다');
    } else if (inputValue === checkPassword) {
      setErrorMsg('');
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다');
    }
  };

  return [
    inputValue,
    errorMsg,
    onInputChangeHandler,
    defaultCheckHandler,
    typeCheckHandler,
    passwordCheckHandler,
  ];
};