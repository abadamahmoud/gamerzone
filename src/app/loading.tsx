"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false });
const MotionP = dynamic(() => import('framer-motion').then(mod => mod.motion.p), { ssr: false });

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="relative"
      >
        <MotionP
          className={`font-semibold text-6xl border-4 dark:border-white border-black rounded-md px-8 py-4 lg:flex bg-neutral-900 text-white dark:bg-neutral-800 ${'your-chakraPetch-className'}`}
          initial={{
            borderColor: "black",
            color: "white",
            boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.5)",
          }}
          animate={{
            borderColor: ["#ffffff", "#ff69b4", "#1e90ff", "#ffffff"],
            color: ["#ffffff", "#ff69b4", "#1e90ff", "#ffffff"],
            boxShadow: [
              "0px 0px 10px rgba(255, 255, 255, 0.5)",
              "0px 0px 20px rgba(255, 105, 180, 0.5)",
              "0px 0px 20px rgba(30, 144, 255, 0.5)",
              "0px 0px 10px rgba(255, 255, 255, 0.5)",
            ],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          Gamerzone
        </MotionP>
        <MotionDiv
          className="absolute inset-0 rounded-md border-4 border-neutral-800"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </MotionDiv>
    </div>
  );
};

export default Loading;
