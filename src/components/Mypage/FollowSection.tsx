import React, { useEffect, useState } from 'react';
import { HistoryCard } from './HistoryCard';
import { TabSection } from './TabSection';
import { MypageProfileRooms } from '../../api/mypage';

export const FollowSection = ({
  myinfo,
}: {
  myinfo: MypageProfileRooms | undefined;
}) => {
  const [activeTab, setActiveTab] = useState('방문기록');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const [myinfolist, setMyinfoList] = useState<MypageProfileRooms>(
    myinfo as MypageProfileRooms
  );

  useEffect(() => {
    if (myinfo) {
      setMyinfoList(myinfo);
    }
  }, [myinfo]);

  useEffect(() => {
    console.log(myinfolist); // myinfolist 값 콘솔에 출력
  }, [myinfolist]);

  const tabList = ['방문기록', '팔로우 목록', '차단 목록'];
  return (
    <div className=" basis-3/5 rounded-3xl bg-[#ffffff] p-8">
      <div className="flex justify-between">
        <div className="flex gap-x-5">
          {tabList.map((tab) => (
            <div
              role="none"
              className={`f-jic cursor-pointer font-semibold text-[#454545] 
          ${
            activeTab === tab
              ? 'border-b-[3px] border-primary-300 text-primary-200'
              : ''
          }`}
              key={tab}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {activeTab === '방문기록' && (
        <TabSection infolist={myinfolist?.metUser} />
      )}
      {activeTab === '팔로우 목록' && (
        <TabSection infolist={myinfolist?.followingUser} />
      )}
      {activeTab === '차단 목록' && (
        <TabSection infolist={myinfolist?.blockListedUser} />
      )}
    </div>
  );
};
