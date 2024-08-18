"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const CommunitiesPage = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white p-6">
      <div className="text-center max-w-lg">
        {/* Animated Emoji */}
        <div className="text-6xl mb-12 animate-pulse">🌐</div>

        {/* Main Message */}
        <h1 className="text-3xl font-bold mb-4">
          Communities Section Coming Soon!
        </h1>

        <p className="text-lg mb-6">
        Join the squads! Our Communities page is on the way, where you'll soon connect and engage with fellow gamers. Hang tight—exciting new interactions are just around the corner!
        </p>

        {/* Button to Go Back */}
        <button
          onClick={() => router.push("/")}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default CommunitiesPage;
