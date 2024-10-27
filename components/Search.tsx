import React from "react";
import { IoIosSearch } from "react-icons/io";

export default function Search() {
  return (
    <div className="h-full w-full p-3 rounded-lg text-black bg-white flex flex-row items-center gap-2">
      <IoIosSearch className="text-xl" />
      <input
        type="text"
        placeholder="Hľadať"
        className="placeholder-black h-full w-full"
      />
    </div>
  );
}
