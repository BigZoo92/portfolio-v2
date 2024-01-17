import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './sass/main.scss';
import Header from './components/Header';
import localFont from 'next/font/local'
import Cursor from './components/Cursor';

export const metadata: Metadata = {
  title: 'Enzo Givernaud - Web Developer and Designer Portfolio',
  description: 'Welcome to the portfolio of Enzo Givernaud, showcasing a diverse range of projects in web development and design, including expertise in React, Next.js, and innovative visual designs.',
  keywords: 'Enzo Givernaud, Web Developer, Web Designer, React Developer, Next.js, Portfolio',
  viewport: 'width=device-width, initial-scale=1.0'
};


// export const SatoshiVariable_Bold = localFont({ src: './fonts/SatoshiVariable-Bold.woff2' })
const NeuePower = localFont({
  src: [
    {
      path: './fonts/NeuePowerTrial-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/NeuePowerTrial-Heavy.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/NeuePowerTrial-Light.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/NeuePowerTrial-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/NeuePowerTrial-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/NeuePowerTrial-Ultra.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={NeuePower.className}>
        <Header />
        {children}
        {/* <Cursor /> */}
      </body>
    </html>
  );
}
