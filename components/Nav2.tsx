"use client";

import React from "react";
import Link from "next/link";

interface NavbarProps {
  usersCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ usersCount }) => {


  return (
    <header className="sticky top-0 flex items-center justify-between bg-white/50 p-4 md:px-6 backdrop-blur z-50">
      <Link href="/">
        <p className="select-none font-serif text-2xl font-medium">
          KUK Confessions
        </p>
      </Link>

      <div className="flex items-center space-x-6">
        <span className="text-sm font-medium text-gray-700">
            👥 {usersCount} online
          </span>
      </div>
    </header>
  );
};

export default Navbar;
