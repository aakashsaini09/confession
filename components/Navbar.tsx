import React from 'react'
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';
const Navbar = () => {
  return (
    <>
      <header className="sticky top-0 flex items-center justify-between bg-black/50 p-4 md:px-6 backdrop-blur mb-0">
      <Link href="/">
        <p className="select-none font-serif text-2xl font-medium">
          KUK Confessions
        </p>
      </Link>
      <div className="flex items-center space-x-6">
        <div>
          <PlusIcon className="h-6 w-6 cursor-pointer" />
        </div>
        <div className="cursor-pointer rounded-full bg-slate-400/20 p-2 hover:bg-slate-400/30">
          <div>
            <MagnifyingGlassIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </header>

    </>
  )
}

export default Navbar