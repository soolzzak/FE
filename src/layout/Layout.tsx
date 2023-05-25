import { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

type ChildenType = {
  children: ReactNode;
};

export const Layout = ({ children }: ChildenType) => {
  return (
    <div>
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
};
