import React from 'react';
import Header from '../header/Header';

const MainLayout = ({ children }: any) => {
   return (
      <div>
         <Header />
         <main>{children}</main>
      </div>
   );
};

export default MainLayout;
