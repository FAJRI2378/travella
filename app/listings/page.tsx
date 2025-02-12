"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

type Listing = {
  id: string;
  imageSrc: string;
  title: string;
  description: string;
  category: string;
  price: number;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  size?: number;
};

const ListingDetail = () => {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("id"); // Ambil ID dari URL
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get<Listing[]>("/api/upload"); // Ambil semua listing dari API
        setListings(response.data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    if (listings.length > 0) {
      const foundListing = listings.find((item) => item.id === listingId);
      setListing(foundListing || null);
    }
  }, [listings, listingId]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!listing) return <p className="text-center text-gray-600">Listing not found.</p>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
      {/* Foto di Paling Atas */}
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <motion.img 
          src={listing.imageSrc} 
          alt={listing.title} 
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Detail Listing */}
      <div className="max-w-3xl bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">{listing.title}</h2>
        <p className="text-lg text-gray-600 mt-2 text-center">{listing.description}</p>
        <p className="text-md text-gray-700 text-center mt-1"><strong>Category:</strong> {listing.category}</p>
        <p className="text-md text-gray-700 text-center mt-1"><strong>Price:</strong> ${listing.price}</p>
        <p className="text-md text-gray-700 text-center mt-1"><strong>Rooms:</strong> {listing.roomCount} | <strong>Bathrooms:</strong> {listing.bathroomCount}</p>
        <p className="text-md text-gray-700 text-center mt-1"><strong>Guests:</strong> {listing.guestCount}</p>
        <p className="text-md text-gray-700 text-center mt-1"><strong>Location:</strong> {listing.locationValue}</p>

        {/* Tombol Reservasi */}
        <div className="flex justify-center mt-6">
          <motion.button
            className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => Swal.fire("Reserved!", "You have successfully reserved this listing.", "success")}
          >
            Reserve
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
