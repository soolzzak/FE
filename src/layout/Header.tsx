import { HeaderRightSection } from '../components/Header/HeaderRightSection';
import { HeaderLeftSection } from '../components/Header/HeaderLeftSection';

export const Header = () => (
  <div className="fixed w-full bg-white z-50">
    <div className="relative f-ic justify-between pl-20 h-[70px] shadow-sm">
      <HeaderLeftSection />
      <HeaderRightSection />
    </div>
  </div>
);
