"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";

const Header = () => {
  return (
    <>
    <header className="fixed text-white shadow-md w-full h-16 bg-yellow-500">
      <div className="absolute top-0 flex flex-row w-full h-16 border-b-4 border-yellow-600 px-4 shadow-xl">
        <div className="flex flex-grow items-center space-x-2">
          <Image src="/Kolo.png" width={99} height={32} alt="Logo"/>
        </div>
        <nav className="h-full">
          <ul className="flex space-x-6 font-semibold font-sans items-center h-full px-4">
            <li>
              <Link href="../catalog">Home</Link>
            </li>
            <li>
              <Link href="../camera">Camera</Link>
            </li>
            <li>
              <Link href="../checking">Problems</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    </>
    
  );
};
export default dynamic(() => Promise.resolve(Header), { ssr: false });
