import React from "react";
import Categories from "@/components/Categories";
import Search from "@/components/Search";
import ItemList from "@/components/ItemList";

export default function Home() {
  return (
    <section className="bg-yellow-500 text-black min-h-screen flex flex-col items-center p-4 gap-4 w-full">
      <Search />
      <Categories />
      <ItemList />
    </section>
  );
}
