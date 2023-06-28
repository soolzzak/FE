import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { MypageProfileRooms, getMypageProfile } from '../api/mypage';
import { AlcoholSection } from '../components/Mypage/AlcoholSection';
import { BadgeSection } from '../components/Mypage/BadgeSection';
import { FollowSection } from '../components/Mypage/FollowSection';
import { MyinfoSection } from '../components/Mypage/MyinfoSection';
import { Modal } from '../components/common/Modal';
import {
  isOpenDeleteAccountAtom,
  isOpenMessageModalAtom,
} from '../store/modalStore';
import { MessageModal } from '../components/Mypage/MessageModal';
import { DeleteAccount } from '../components/login/DeleteAccountModal';

export const Mypage = () => {
  const { data } = useQuery('mypageInfo', getMypageProfile, {
    refetchOnWindowFocus: false,
  });
  const [myinfo, setMyinfo] = useState<MypageProfileRooms | undefined>();

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>{(error as Error).message}</div>;

  useEffect(() => {
    if (data) {
      setMyinfo(data.data);
      // console.log(data);
    }
  }, [data]);

  return (
    <div className="flex-grow w-full gap-10 min-w-[520px] bg-[#f6fff9] min-h-screen">
      <div className="f-ic-col relative">
        <div className="flex md:flex-row flex-col px-6 w-full mt-32 max-w-[1200px] mx-auto gap-10">
          {myinfo && (
            <div className="basis-2/5">
              <MyinfoSection myinfo={myinfo} />
            </div>
          )}

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
