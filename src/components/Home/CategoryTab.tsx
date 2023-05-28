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
    <nav className="w-full">
      <div className="f-jic  bg-white">
        {tabList.map((tab, index) => (
          <div
            className={`cursor-pointer px-9 mx-3 py-5 text-2xl font-semibold text-[#454545] 
            ${activeTab === tab ? 'border-b-[3px] border-[#1D1D1D]' : ''}`}
            key={index}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
    </nav>
  );
};
