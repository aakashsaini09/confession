import React from 'react'
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';
const Navbar = () => {
  return (
    <>
      <header className="sticky top-0 flex items-center justify-between bg-white/50 p-4 backdrop-blur border-b-2 mb-8 border-black">
      <Link href="/">
        <p className="select-none font-serif text-2xl font-medium">
          Confessions
        </p>
      </Link>
      <div className="flex items-center space-x-6">
        <Link href="/posts">
          <PlusIcon className="h-6 w-6 cursor-pointer" />
        </Link>
        <div className="cursor-pointer rounded-full bg-slate-400/20 p-2 hover:bg-slate-400/30">
          <Link href="/search">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>

    </>
  )
}

export default Navbar
