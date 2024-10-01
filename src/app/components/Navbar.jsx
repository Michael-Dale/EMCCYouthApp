import React from "react";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import Link from "next/link";

function NavbarIcon({ icon: Icon, label }) {
  // Rename this to match the usage below
  return (
    <Link href="#" className="flex flex-col items-center text-white">
      <Icon className="w-6 h-6 mb-1" />
      <span className="text-xs">{label}</span>
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black p-4 ">
      <div className="flex justify-around items-center max-w-screen-lg mx-auto">
        <NavbarIcon icon={Home} label="Home" />{" "}
        {/* Now matches the correct component name */}
        <NavbarIcon icon={Search} label="Search" />
        <NavbarIcon icon={PlusSquare} label="Create" />
        <NavbarIcon icon={Heart} label="Notifications" />
        <NavbarIcon icon={User} label="Profile" />
      </div>
    </nav>
  );
}
