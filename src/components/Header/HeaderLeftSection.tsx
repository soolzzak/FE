import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../assets/svgs/Logo';
import { Search } from '../../assets/svgs/Search';
import { usernameAtom } from '../../store/mainpageStore';

export const HeaderLeftSection = () => {
  const [userToken] = useAtom(usernameAtom);
  const navigate = useNavigate();
  return (
    <section className="f-ic max-w-[600px] w-full">
      <div role="none" onClick={() => navigate('/')} className="cursor-pointer">
        <Logo />
      </div>
      <div
        className={`f-ic w-[300px] ml-8 py-3.5 pl-4 h-12 bg-[#F4F4F4] rounded-2xl md:flex
        ${userToken ? 'hidden' : ''} 
        `}
      >
        <Search />
        <input
          type="text"
          className="px-3 bg-transparent outline-none text-lg font-medium text-[#323232] placeholder-[#9A9A9A]"
          placeholder="혼술짝 방 검색하기"
        />
      </div>
    </section>
  );
};
