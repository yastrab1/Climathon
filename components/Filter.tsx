import React from "react";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";

export default function Filter() {
  return (
    <div className="w-full flex gap-2">
        <div className="py-2 px-4 rounded-lg bg-white text-yellow text-sm font-sans font-medium shadow-xl flex flex-row items-center">
        36 716 vecí
      </div>
      <div className="flex-grow"></div>
      <button className="p-2 pr-4 rounded-lg bg-white text-yellow text-sm font-sans font-medium shadow-xl flex flex-row gap-1 items-center">
        <FaArrowUpWideShort className="text-base" />
        Zoradiť
      </button>
      <button className="p-2 pr-4 rounded-lg bg-white text-yellow text-sm font-sans font-medium shadow-xl flex flex-row gap-1 items-center">
        <IoFilter className="text-base" />
        Filtrovať
      </button>
    </div>
  );
}
