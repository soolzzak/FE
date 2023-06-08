import { useNavigate } from 'react-router-dom';
import { Logo } from '../../assets/svgs/Logo';
import { SearchField } from './SearchField';

export const HeaderLeftSection = () => {
  const navigate = useNavigate();

  return (
    <section className="f-ic max-w-[600px] w-full">
      <div role="none" onClick={() => navigate('/')} className="cursor-pointer">
        <Logo />
      </div>
      <SearchField />
    </section>
  );
};
