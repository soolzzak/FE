import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { Search } from '../../assets/svgs/Search';
import {
  handleDisplayedTabChangeAtom,
  handleSearchwordAtom,
  handleSearchwordTriggerAtom,
  searchwordTriggerAtom,
  tabAtom,
  usernameAtom,
} from '../../store/mainpageStore';

export const SearchField = () => {
  const [userToken] = useAtom(usernameAtom);
  const [searchValue, setSearchValue] = useState('');
  const [, setTab] = useAtom(tabAtom);
  const [, setDisplayedTab] = useAtom(handleDisplayedTabChangeAtom);
  const [, setSearchWord] = useAtom(handleSearchwordAtom);
  const [prev, setSearchWordTrigger] = useAtom(searchwordTriggerAtom);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTab('SEARCH');
      setDisplayedTab(`'${searchValue || ' '}'에 대한 검색결과`);
      setSearchWord(searchValue);
      setSearchValue('');
      setSearchWordTrigger(!prev);
      window.scrollTo({
        top: 410,
        behavior: 'smooth',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div
      className={`f-ic w-[300px] ml-8 py-3.5 pl-4 h-12 bg-[#F4F4F4] rounded-2xl md:flex
        ${userToken ? 'hidden' : ''} 
        `}
    >
      <Search />
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="px-3 bg-transparent outline-none text-lg font-medium text-[#323232] placeholder-[#9A9A9A]"
        placeholder="혼술짝 방 검색하기"
      />
    </div>
  );
};
