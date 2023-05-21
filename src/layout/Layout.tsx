import React, { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

type ChildenType = {
  children: ReactNode;
};

export const Layout: React.FC<ChildenType> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
