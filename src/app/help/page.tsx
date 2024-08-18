"use client"
import React from 'react';
import { useRouter } from 'next/navigation';


const HelpPage = () => {
  const router = useRouter();



  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white p-6">
    <div className="text-center max-w-lg">

        

        {/* Animated Emoji */}
        <div className="text-6xl mb-12 animate-pulse">🆘</div>

        {/* Main Message */}
        <h1 className="text-3xl font-bold mb-4">
          Help Section Coming Soon!
        </h1>

        <p className="text-lg mb-6">
        Need help? Our Help page is under construction to provide you with the best support. Stay tuned for updates and easy access to helpful resources.
        </p>

        {/* Button to Go Back */}
        <button
          onClick={() => router.push("/")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default HelpPage;
