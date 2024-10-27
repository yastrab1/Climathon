"use client";
import Image from "next/image";
import bikeImage1 from "../../public/Motorka.jpg";
import bikeImage2 from "../../public/Stolicka.jpg";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const ExactMatchComponent = () => {
  const [currentImage, setCurrentImage] = useState(bikeImage1); // Initialize with the first image
  const [categories, setCategories] = useState(["Hračka", "Šport"]);
  //const [categories2, setCategories2] = useState(['Nabytok', 'Stolicka']);
  const [newCategory, setNewCategory] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false); // Show/hide suggestions

  // Suggested categories to choose from
  const suggestedCategories = [
    "Nábytok",
    "Knižnica",
    "Skrina",
    "Komoda",
    "Stolik velky",
    "Stolik maly",
    "Kreslo",
    "Stolicka",
    "Postel",
    "Pohar",
    "Tanier",
    "Domace potreby",
    "Zahrada",
    "Kocik",
    "Hracky",
    "Sportove potreby",
    "Tenisky",
    "Bicykel",
    "Lyzovanie",
    "Lopta",
    "Korčule",
    "Kniha",
    "CD",
    "DVD",
    "Platne",
    "Textil",
    "Kufor",
    "Ruksak",
    "Kabelka",
    "Taska",
    "Zrkadlo",
    "Lampa",
    "Polica",
    "Koberec",
    "Obrazy",
    "Závesy",
    "Kuchynské spotrebiče",
    "Rastliny",
    "Gril",
    "Stan",
    "Rybárske potreby",
    "Slnečník",
    "Horské potreby",
    "Skateboard",
    "Snowboard",
    "Laptop",
    "Mobilné príslušenstvo",
    "Fotoaparát",
    "Reproduktor",
    "Herná konzola",
    "Tablet",
    "Slúchadlá",
    "Šál",
    "Opasok",
    "Peňaženka",
    "Náramok",
    "Okuliare",
    "Sako",
    "Šaty",
    "Modely áut",
    "Akčné figúrky",
    "Puzzle",
    "Umelecké potreby",
    "Hudobné nástroje",
    "Vojenské potreby",
    "Vianočné dekorácie",
    "Halloween kostýmy",
    "Velkonočné ozdoby",
    "Letné potreby",
    "Darčekové koše",
    "Odrazadlo",
  ];

  const handleAddCategory = (event) => {
    if (
      event.key === "Enter" &&
      newCategory.trim() &&
      !categories.includes(newCategory)
    ) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory(""); // Clear input
      setShowSuggestions(false); // Hide suggestions
    }
  };

  const categoriesList = {
    bikeImage1: ["Sportove potreby", "Bicykel", "Hracka", "Odrazadlo"],
    bikeImage2: ["Nábytok", "Kreslo", "Stolicka", "Domace potreby"],
  };
  const handleClick = () => {
    if (currentImage === bikeImage1) {
      setCurrentImage(bikeImage2);
      setCategories(categoriesList.bikeImage2);
    } else {
      setCurrentImage(bikeImage1);
      setCategories(categoriesList.bikeImage1);
    }
  };
  const handleRemoveCategory = (categoryToRemove) => {
    // Remove the clicked category
    setCategories(
      categories.filter((category) => category !== categoryToRemove)
    );
  };

  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
    setShowSuggestions(true); // Show suggestions on input change
  };

  const handleSuggestionClick = (suggestedCategory) => {
    if (!categories.includes(suggestedCategory)) {
      setCategories([...categories, suggestedCategory]); // Add selected suggestion
    }
    setNewCategory(""); // Clear input
    setShowSuggestions(false); // Hide suggestions
  };

  // Filtered suggestions based on the current input
  const filteredSuggestions = suggestedCategories.filter((suggestion) =>
    suggestion.toLowerCase().startsWith(newCategory.toLowerCase())
  );

  return (
    <div className="bg-yellow-600 flex flex-col gap-4 items-center p-4 rounded-xl w-[32rem]">
      <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={currentImage}
          alt="Current Image"
          width={500}
          height={500}
        />
      </div>

      <div className="flex justify-center space-x-2">
        {categories.map((category) => (
          <span
            key={category}
            onClick={() => handleRemoveCategory(category)} // Remove category on click
            className="bg-white font-medium font-sans px-3 py-1 rounded-xl text-sm cursor-pointer hover:bg-gray-300"
          >
            {category} ✕
          </span>
        ))}
      </div>

      <input
        type="text"
        placeholder="Napíš meno kategórie ktorú chceš pridať"
        value={newCategory}
        onChange={handleInputChange}
        onKeyDown={handleAddCategory} // Add category on Enter
        className="border border-gray-300 rounded-full px-4 py-2 w-full text-center mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />

      {showSuggestions && newCategory && filteredSuggestions.length > 0 && (
        <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleClick}
        className="bg-green-500 text-white font-medium font-sans py-2 px-6 rounded-full hover:bg-green-600 text-sm flex flex-row items-center gap-4"
      >
        Schváliť
        <FaCheck />
      </button>
    </div>
  );
};

export default ExactMatchComponent;
