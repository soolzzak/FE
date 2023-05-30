import { useState } from 'react';

export const CategoryTab = () => {
  const [activeTab, setActiveTab] = useState('전체');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const tabList = [
    '전체',
    '영화/드라마',
    '맛집/여행',
    '고민상담',
    '스포츠/게임',
    '오늘하루',
    '자유방',
  ];

  return (
    <nav className="w-full ">
      <div className="f-jic bg-white grid grid-cols-4 lg:grid-cols-7 gap-0 min-w-[660px] lg:px-14">
        {tabList.map((tab) => (
          <div
            role="none"
            className={`f-jic cursor-pointer px-5 py-4 text-xl font-semibold text-[#454545] 
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
    </nav>
  );
};
