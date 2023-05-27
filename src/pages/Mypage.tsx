import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { MypageProfileResponse, getMypageProfile } from '../api/mypage';
import { HistorySection } from '../components/Mypage/HistorySection';
import { AlcoholSection } from '../components/Mypage/AlcoholSection';
import { MyinfoSection } from '../components/Mypage/MyinfoSection';
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
    <div className="flex flex-col mx-80 mt-5 gap-10">
      <div className="mt-32">
        <div className="text-2xl font-bold my-11">마이페이지</div>
        <div className="flex w-full h-[700px] gap-10 ">
          <MyinfoSection />
          <div className="flex flex-col basis-3/5 gap-y-6 ">
            <AlcoholSection />
            <HistorySection />
          </div>
        </div>
      </div>
    </div>
  );
};
