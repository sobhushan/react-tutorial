import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
//import './globals.css'; // Additional global styles

export const metadata = {
  title: 'ATM Application',
  description: 'Welcome to the ATM application!',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;