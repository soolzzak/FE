import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { MypageProfileResponse, getMypageProfile } from '../api/mypage';

export const Mypage = () => {
  const { data, isLoading, isError, error } = useQuery(
    'mypageInfo',
    getMypageProfile
  );
  const [myinfo, setMyinfo] = useState<MypageProfileResponse | null>(null);

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>{(error as Error).message}</div>;

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
    <div className="flex flex-col h-[700px] mx-80 gap-10">
      <div className="mt-28">
        <div className="text-2xl font-bold my-11">마이페이지</div>
        <div className="flex w-full h-full gap-10 ">
          <div className="bg-[#D9D9D9] basis-2/5 rounded-3xl flex flex-col gap-y-6">
            <div className="flex flex-col mt-20 justify-center items-center gap-y-6">
              <div className="w-52 h-52 rounded-full bg-[#9A9A9A] mr-4 "></div>
              <p>곽준희</p>
            </div>
            <div className="ml-20 mt-5">
              <p className="font-bold text-lg">이메일</p>
              <p>example.naver.com</p>
            </div>
            <div className="ml-20">
              <p className="font-bold text-lg">연결된 소설계정</p>
              <p>카카오톡 계정으로 연결되었습니다</p>
            </div>
          </div>
          <div className="flex flex-col basis-3/5 gap-y-6 ">
            <div className="basis-1/2 bg-[#D9D9D9] rounded-3xl flex flex-col p-8 gap-y-2">
              <p className="font-semibold">도수레벨</p>
              <p>다양한 사람들과 교류하고 도수레벨을 올려보세요!</p>
              <div className="flex flex-row justify-end">
                <p className="place-items-end">77c</p>
                <div className="w-24 h-24 rounded-full bg-[#9A9A9A] mr-4 "></div>
              </div>
            </div>

            <div className="basis-1/2 bg-[#D9D9D9] rounded-3xl p-8">
              <p className="font-semibold">방문기록</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
