import React, { ReactNode } from 'react';
import { Header } from './Header';

type ChildenType = {
  children: ReactNode;
};

export const Layout = ({ children }: ChildenType) => (
  <div className="min-h-screen">
    <Header />
    {children}
    {/* <Footer /> */}
  </div>
);
