import React from "react";
import Item from "@/components/Item";
import Filter from "@/components/Filter";

export default function ItemList() {
  return (
    <div className="w-full p-4 bg-yellow-600 rounded-xl flex flex-col gap-4 shadow-xl">
      <Filter />
      <div className="grid grid-cols-2 gap-4">
        <Item
          categories={["Deti", "Malé", "3-5 rokov"]}
          source="/Vlacik.jpeg"
        />
        <Item
          categories={["Nábytok", "Stoličky", "Kancelárske"]}
          source="/Stolicka.jpg"
        />
        <Item
          categories={["Keramika", "Hrnčeky", "Béžová"]}
          source="/Hrnceky.jpg"
        />
        <Item
          categories={["Šport", "Deti", "Tenisky", "Beh"]}
          source="/Tenisky.jpg"
        />
        <Item
          categories={["Deti", "Stredné", "3-5 rokov"]}
          source="/Motorka.jpg"
        />
        <Item
          categories={["Chovateľstvo", "stredné", "Klietka"]}
          source="/Klietka.jpg"
        />
      </div>
    </div>
  );
}
