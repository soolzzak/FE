import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

// type ChildenType = {
//   children: ReactNode;
// };

// export const Layout = ({ children }: ChildenType) => (
//   <div className="min-h-screen bg-[#f6fff9]">
//     <Header />
//     {children}
//     <Footer />
//   </div>
// );

type LayoutProps = {
  children: ReactNode;
  hideFooter?: boolean;
};

export const Layout = ({ children, hideFooter }: LayoutProps) => (
  <div className="min-h-screen bg-[#f6fff9]">
    <Header />
    <main className="flex-grow h-full">{children}</main>
    {!hideFooter && <Footer />}
  </div>
);
