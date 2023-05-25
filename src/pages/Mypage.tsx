import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { MypageProfileResponse, getMypageProfile } from '../api/mypage';

export const Mypage = () => {
  const { data, isLoading, isError, error } = useQuery(
    'mypageInfo',
    getMypageProfile
  );
  const [myinfo, setMyinfo] = useState<MypageProfileResponse | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{(error as Error).message}</div>;

  if (true) {
  } else {
  }
  useEffect(() => {
    if (data) {
      setMyinfo(data);
      console.log(data);
    }
  }, [data]);

  return (
    <div>
      <button></button>
      <div>{myinfo?.image}</div>
      <span>{myinfo?.nickname}</span>
    </div>
  );
};
