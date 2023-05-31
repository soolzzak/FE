import { Logo } from '../../assets/svgs/Logo';
import { Search } from '../../assets/svgs/Search';

export const HeaderLeftSection = () => (
  <section className="f-ic max-w-[600px] w-full">
    <Logo />
    <div className="f-ic min-w-[250px] ml-8 py-3.5 pl-4 h-12 bg-[#F4F4F4] rounded-2xl hidden md:flex">
      <Search />
      <input
        type="text"
        className="px-3 bg-transparent outline-none text-lg font-medium text-[#323232] placeholder-[#9A9A9A]"
        placeholder="혼술짝 방 검색하기"
      />
    </div>
  </section>
);
