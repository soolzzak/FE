import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

type LayoutProps = {
  children: ReactNode;
  hideFooter?: boolean;
};

export const Layout = ({ children, hideFooter }: LayoutProps) => (
  <div className="min-h-screen w-full bg-[#f6fff9]">
    <Header />
    <main className="flex-grow h-full w-full">{children}</main>
    {!hideFooter && <Footer />}
  </div>
);
