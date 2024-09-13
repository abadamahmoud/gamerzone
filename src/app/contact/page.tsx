"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const ContactPage = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white p-6">
    <div className="text-center max-w-lg">
        {/* Animated Emoji */}
        <div className="text-6xl mb-12 animate-pulse">📞</div>

        {/* Main Message */}
        <h1 className="text-3xl font-bold mb-4">
          Contact Section Coming Soon!
        </h1>

        <p className="text-lg mb-6">
        We&apos;re crafting a better way for you to connect with us. Our Contact page will be live soon, bringing you a seamless way to reach out.
          <br/>
          In the meantime, you can still get in touch with our developer via <a href= "mailto: mabadadev@gmail.com" className='underline  text-yellow-500'> email</a>. 
          </p>
        {/* Button to Go Back */}
        <button
          onClick={() => router.push("/")}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
