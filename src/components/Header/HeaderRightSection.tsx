import React from 'react';
import { Notifications } from '../../assets/svgs/Notifications';

export const HeaderRightSection = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <section className="f-ic mr-4">
      <button className="mr-5 text-lg" onClick={() => setIsOpen(true)}>
        Login
      </button>
      <Notifications />
      <div className="px-7 text-xl font-semibold">{'Username'}</div>
      <div className="w-16 h-16 rounded-full bg-[#9A9A9A]"></div>
    </section>
  );
};
