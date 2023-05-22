import React from 'react';
import { useQuery } from 'react-query';
import { MypageProfileResponse, getMypageProfile } from '../api/mypage';

export const Mypage = () => {
  const { data, isLoading, isError, error } = useQuery(
    'mypageInfo',
    getMypageProfile
  );
  const [myinfo, setMyinfo] = React.useState<MypageProfileResponse>();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{(error as Error).message}</div>;

  React.useEffect(() => {
    if (data) {
      setMyinfo(data);
    }
  }, [data]);

  return <div>{myinfo?.nickname}</div>;
};
