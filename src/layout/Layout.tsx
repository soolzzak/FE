import React, { ReactNode } from 'react';
import { Header } from './Header';

type ChildenType = {
  children: ReactNode;
};

export const Layout = ({ children }: ChildenType) => (
  <div className="min-h-screen bg-[#f6fff9]">
    <Header />
    {children}
    {/* <Footer /> */}
  </div>
);
