import { Logo } from '../../assets/svgs/Logo';
import { SearchField } from './SearchField';

export const HeaderLeftSection = () => {
  const redirectToRoot = () => {
    window.location.href = '/';
  };

  return (
    <section className="f-ic max-w-[600px] w-full">
      <div role="none" onClick={redirectToRoot} className="cursor-pointer">
        <Logo />
      </div>
      <SearchField />
    </section>
  );
};
