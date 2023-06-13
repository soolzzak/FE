import { HeaderRightSection } from '../components/Header/HeaderRightSection';
import { HeaderLeftSection } from '../components/Header/HeaderLeftSection';

export const Header = () => (
  <div className="fixed f-jic w-full bg-white z-50 shadow-sm">
    <div className="relative f-jic max-w-[1600px] min-w-[660px] w-full xl:px-24 justify-between h-[70px]">
      <HeaderLeftSection />
      <HeaderRightSection />
    </div>
  </div>
);
