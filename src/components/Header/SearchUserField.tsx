import { useAtom } from 'jotai';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { FindUser, FindUserName } from '../../api/mypage';
import { Search } from '../../assets/svgs/Search';
import { SearchUserCard } from './SearchUserCard';

export const SearchUserField = () => {
  //  유저 찾기
  // const [searchUsernameModalIsOpen, setSearchUsernameModalIsOpen] = useAtom(
  //   isOpenSearchUsernameModalAtom
  // );
  const [searchUserName, setsearchUserName] = useState<string>('');

  const [userData, setUserData] = useState<FindUserName[] | undefined>();

  const usernameSearchMutation = useMutation(FindUser, {
    onSuccess: (response: any) => {
      setUserData(response.data);
      // console.log('응', response.data);
    },
  });

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchUserName) {
      usernameSearchMutation.mutate(searchUserName);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchUserName(e.target.value);
  };

  return (
    <div className="f-jic-col px-5 py-5 rounded-2xl bg-white">
      <p className="text-[#454545] font-bold text-xl">
        찾고싶은 유저의 닉네임을 검색해보세요!
      </p>
      <div className="f-ic bg-[#F4F4F4] rounded-lg mt-3 mb-5 pl-2 w-[284px] h-[34px]">
        <Search />
        <input
          type="text"
          value={searchUserName}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full  h-[32px] px-2 bg-transparent outline-none text-base font-medium text-[#323232] placeholder-[#9A9A9A]"
          placeholder="닉네임 검색"
        />
      </div>
      {/* 각카드들 */}
      <div className="scroll-container max-h-[300px] overflow-y-auto">
        {userData?.map((item) => (
          <SearchUserCard userData={item} />
        ))}
      </div>
    </div>
  );
};
