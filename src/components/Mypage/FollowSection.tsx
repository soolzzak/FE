import React, { useEffect, useState } from 'react';

export const FollowSection = () => {
  const [activeTab, setActiveTab] = useState('팔로우목록');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const tabList = ['팔로우 목록', '차단 목록'];
  return (
    <div className=" basis-3/5 rounded-3xl bg-[#D9D9D9] gap-4 gap-y-6 p-8">
      <div className="flex justify-between">
        <div className="flex gap-x-5">
          {tabList.map((tab) => (
            <div
              role="none"
              className={`f-jic cursor-pointer  font-semibold text-[#454545] 
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
        <div>더보기</div>
      </div>
    </div>
  );
};
