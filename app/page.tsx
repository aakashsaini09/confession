'use client'                    // ← important
import { motion } from 'framer-motion'
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { Button } from "@/components/ui/button";
// import Card from "@/components/ui/card";

export default function Home() {
  const router = useRouter();
  return (
    <>
   <div className='hidden md:block'>
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/hd/hidden-2u0aiye7srpngc7z.jpg')",
      }}
    >
      {/* Glass Blur Overlay */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-xl"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-lg text-center px-6 py-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold text-white drop-shadow-lg"
        >
          Confess Anonymously
        </motion.h1>

        <p className="mt-4 text-lg text-white/90">
          Share your thoughts, secrets, and confessions without revealing your identity.
          <br />
          100% private. 100% real.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8"
        >
          <Link href="/posts">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-full bg-black text-white font-semibold shadow-lg focus:outline-none cursor-pointer"
            >
              Confessions 
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
   </div>
    {/* +++++++++++++++++++++ */}
    <div className="block md:hidden">
      <Navbar/>
          <div className="min-h-screen py-5 font-serif flex flex-col bg-gradient-to-b from-blue-100 via-white to-purple-100">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-gray-800"
        >
          Speak Your Mind, <span className="text-blue-500">Anonymously</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl"
        >
          This is your safe space to share your secrets, feelings, and thoughts.
          No sign-up, no identity tracking — just pure, honest confessions.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/posts')}
          className="mt-8 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-all duration-200"
        >
          Confessions
        </motion.button>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12 shadow-inner">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            {
              title: 'Anonymous',
              desc: 'Your identity is hidden — no tracking, no exposure.',
              icon: '🙈',
            },
            {
              title: 'Share Freely',
              desc: 'Express yourself without fear of judgment.',
              icon: '💬',
            },
            {
              title: 'Connect Emotionally',
              desc: 'Read others’ stories and feel less alone.',
              icon: '🤝',
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * i }}
              className="p-6 bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow hover:shadow-lg transition-all"
            >
              <div className="text-4xl">{f.icon}</div>
              <h3 className="mt-4 font-bold text-lg text-gray-800">{f.title}</h3>
              <p className="mt-2 text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Confession Hub — All rights reserved.
      </footer>
    </div>
    </div>
    </>
  );
}
