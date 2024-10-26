// components/Header.js
'use client'
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-primaryYellow text-white p-4 shadow-md w-full h-10">
      <div className="flex items-center space-x-2">
        {/* Logo Placeholder */}
        <div className="w-10 h-10 bg-white rounded-full"></div>
        <span className="font-bold text-xl">KOLO</span>
      </div>
      <nav>
        <ul className="flex space-x-6 font-semibold">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>
    </div>
  );
};
export default dynamic(() => Promise.resolve(Header), { ssr: false });