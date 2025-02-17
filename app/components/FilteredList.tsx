import { useState } from "react";
import Image from "next/image";

const categories = [
  "Beach",
  "Windmills",
  "Modern",
  "Countryside",
  "Pools",
  "Islands",
  "Lake",
  "Skiing",
  "Castles",
  "Caves",
  "Camping",
  "Arctic",
  "Desert",
  "Barns",
  "Lux",
];

const listings = [
  { id: 1, name: "aa", category: "Islands", img: "/image1.jpg" },
  { id: 2, name: "fc", category: "Beach", img: "/image2.jpg" },
  { id: 3, name: "dcd", category: "Beach", img: "/image3.jpg" },
];

export default function FilteredList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredListings = selectedCategory
    ? listings.filter((listing) => listing.category === selectedCategory)
    : listings;

  return (
    <div className="p-5">
      {/* Kategori Filter */}
      <div className="flex space-x-4 mb-5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded ${
              selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
        <button onClick={() => setSelectedCategory(null)} className="px-4 py-2 bg-red-500 text-white rounded">
          Reset
        </button>
      </div>

      {/* List Gambar */}
      <div className="grid grid-cols-3 gap-4">
        {filteredListings.map((item) => (
          <div key={item.id} className="bg-white shadow-lg rounded p-3">
            <Image src={item.img} alt={item.name} width={300} height={200} className="w-full h-40 object-cover rounded" />
            <h3 className="mt-2 font-semibold">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
