import { HeaderRightSection } from '../components/Header/HeaderRightSection';
import { HeaderLeftSection } from '../components/Header/HeaderLeftSection';

export const Header = () => (
  <div className="fixed sm:f-jic w-full bg-white z-50 shadow-sm min-w-[520px]">
    <div className="relative flex sm:f-ic max-w-[1600px]  w-full xl:px-24 justify-between h-[70px]">
      <HeaderLeftSection />
      <HeaderRightSection />
    </div>
  </div>
);
