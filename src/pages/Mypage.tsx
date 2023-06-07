import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { MypageProfileRooms, getMypageProfile } from '../api/mypage';
import { AlcoholSection } from '../components/Mypage/AlcoholSection';
import { MyinfoSection } from '../components/Mypage/MyinfoSection';
import { BadgeSection } from '../components/Mypage/BadgeSection';
import { FollowSection } from '../components/Mypage/FollowSection';

export const Mypage = () => {
  const { data, isLoading, isError, error } = useQuery(
    'mypageInfo',
    getMypageProfile,
    {
      refetchOnWindowFocus: false,
    }
  );
  const [myinfo, setMyinfo] = useState<MypageProfileRooms | undefined>();

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>{(error as Error).message}</div>;

  useEffect(() => {
    if (data) {
      setMyinfo(data.data);
      console.log(data);
    }
  }, [data]);

  return (
    <div className="flex flex-col mx-80  gap-10 ">
      <div className="mt-32">
        <div className="text-2xl font-bold my-11">마이페이지</div>
        <div className="flex w-full h-full gap-10">
          {/* <div className="h-[400px]"> */}
          {myinfo && <MyinfoSection myinfo={myinfo} />}
          {/* </div> */}

          <div className="flex flex-col basis-3/5 gap-y-6">
            {myinfo && <AlcoholSection alcohol={myinfo.alcohol} />}
            <FollowSection myinfo={myinfo} />
          </div>
        </div>
        <div className="flex flex-row mt-10 gap-x-10">
          <BadgeSection />
        </div>
      </div>
    </div>
  );
};
