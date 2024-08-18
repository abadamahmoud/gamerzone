"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const FeedbackPage = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white p-6">
      <div className="text-center max-w-lg">
        {/* Animated Emoji */}
        <div className="text-6xl mb-12 animate-pulse">🛠️</div>

        {/* Main Message */}
        <h1 className="text-3xl font-bold mb-4">
          Feedback Section Coming Soon!
        </h1>

        <p className="text-lg mb-6">
        We're listening! Our Feedback page will be live shortly, and we're eager to hear your thoughts. Stay tuned to share your ideas and help shape our platform.
        </p>

        {/* Button to Go Back */}
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage;
