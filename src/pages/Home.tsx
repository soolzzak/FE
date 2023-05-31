import { HeroSection } from '../components/Home/HeroSection';
import { CategoryTab } from '../components/Home/CategoryTab';
import { HomeBodySection } from '../components/Home/HomeBodySection';

export const Home = () => (
  <div className="f-ic-col bg-primary-100 min-h-screen w-full">
    <HeroSection />
    <CategoryTab />
    <HomeBodySection />
  </div>
);