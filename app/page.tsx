'use client'               
import { motion } from 'framer-motion'
import Link from 'next/link';
import Image from 'next/image';
import mobileImg from '@/public/hacker.jpg'
import pcImg from '@/public/kuk-pc.jpg'
// import { Button } from "@/components/ui/button";
// import Card from "@/components/ui/card";
// "url('https://wallpapers.com/images/hd/hidden-2u0aiye7srpngc7z.jpg')",

export default function Home() {
  const courses = [
  { name: "MCA", color: "from-purple-500 to-indigo-500" },
  { name: "MBA", color: "from-pink-500 to-red-500" },
  { name: "LLB", color: "from-green-500 to-emerald-500" },
  { name: "BCA", color: "from-blue-500 to-cyan-500" },
];
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white font-serif">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={pcImg} width={100} height={100} alt="KUK Campus" className="hidden md:block w-full h-full object-cover" />
        <Image src={mobileImg} width={60} alt="KUK Campus" className="sm:hidden block w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 md:bg-black/60 backdrop:blur-xs md:backdrop-blur-sm" /> 
        {/* dark overlay for readability */}
      </div>

      {/* Title Section */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl pt-8 font-extrabold mb-4 text-center relative z-10"
      >
        KUK Confessions
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-xs md:text-xl mb-10 text-gray-200 text-center max-w-lg md:max-w-xl relative z-10"
      >
        Share your secrets, thoughts, and experiences anonymously with your coursemates.  
        <span className="font-semibold text-white"> Your identity stays hidden.</span>
      </motion.p>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 max-w-6xl relative z-10">
        {courses.map((course, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-2xl w-[70vw] md:w-36 bg-gradient-to-r ${course.color} p-[2px] `}
          >
            <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-8 h-full flex flex-col items-center justify-center cursor-pointer shadow-xl">
              <h2 className="text-2xl font-bold">{course.name}</h2>
              <Link href={`/posts`}>
              {/* <Link href={`/confessions/${course.name.toLowerCase()}`}> */}
                <button className="mt-6 px-5 py-2 bg-white text-black cursor-pointer rounded-full font-semibold hover:bg-gray-200 transition">
                  Enter
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-12 text-gray-400 text-sm text-center relative z-10 py-4 md:py-2">
        Made for Kurukshetra University students ❤️
      </p>
    </div>
  );
}