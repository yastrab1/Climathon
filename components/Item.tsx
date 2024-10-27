import React from "react";
import Image from "next/image";

interface Props {
    categories: string[];
    source: string;
}

export default function Item({ categories, source }: Props) {
  return (
    <div className="w-full bg-white text-black p-2 rounded-lg flex flex-col items-center space-y-2 shadow-xl">
      <div className="bg-yellow-600 w-[136px] h-[136px] rounded-lg flex items-center justify-center overflow-hidden">
        <Image src={source} width={140} height={140} alt={source}/>
      </div>
      <div className="px-2">
        <p className="text-sm font-bold">{categories.map((item, index) => (index != 0) ? (" | " + item) : item)}</p>
      </div>
    </div>
  );
}
