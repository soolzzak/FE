import { Search } from '../../assets/svgs/Search';

export const HeaderLeftSection = () => (
  <section className="f-ic max-w-[600px] w-full">
    <div className="font-bold text-[#323232] ml-40 text-2xl">logo</div>
    <div className="f-ic w-full ml-8 py-3.5 pl-4 h-14  bg-[#D9D9D9] rounded-2xl">
      <input
        type="text"
        className="absolute p-10 bg-transparent outline-none text-xl font-medium text-[#323232] placeholder-[#9A9A9A]"
        placeholder="혼술짝 방 검색하기"
      />
      <Search />
    </div>
  </section>
);
