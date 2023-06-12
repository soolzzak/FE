import { useState } from 'react';

type ReturnTypes = [string | undefined, (input: string | undefined) => void];

export const useError = (): ReturnTypes => {
  const [errMsg, setErrMsg] = useState<string | undefined>();
  const errHandler = (input: string | undefined) => {
    if (!input) {
      setErrMsg('필수정보 입니다');
    } else {
      setErrMsg('');
    }
  };

  return [errMsg, errHandler];
};
