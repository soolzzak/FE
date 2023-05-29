import { Search } from '../assets/svgs/Search';
import { Notifications } from '../assets/svgs/Notifications';

export const Header = () => {
  return (
    <div className="fixed w-full">
      <div className="relative flexVerticalCenter justify-between h-24 shadow-sm">
        {/* Header left side */}
        <div className="flexVerticalCenter max-w-[600px] w-full">
          <div className="font-bold text-[#323232] ml-40 text-2xl">logo</div>
          <div className="flexVerticalCenter w-full ml-8 py-3.5 pl-4 h-14  bg-[#D9D9D9] rounded-2xl">
            <input
              type="text"
              autoFocus
              className="absolute p-10 bg-transparent outline-none text-xl font-medium text-[#323232] placeholder-[#9A9A9A]"
              placeholder="혼술짝 방 검색하기"
            />
            <Search />
          </div>
        </div>
        {/* Header right side */}
        <div className="flexVerticalCenter mr-4">
          <Notifications />
          <div className="px-7 text-xl font-semibold">{'Username'}</div>
          <div className="w-16 h-16 rounded-full bg-[#9A9A9A]"></div>
        </div>
      </div>
    </div>
  );
};
