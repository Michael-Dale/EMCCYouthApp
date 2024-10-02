import React from "react";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import Link from "next/link";
import Testicon from "@/app/components/testicon";

function NavbarIcon({ icon: Icon, label }) {
  return (
    <Link href="#" className="flex flex-col items-center text-white">
      <Icon className="w-6 h-6 mb-1" />
      <span className="text-xs">{label}</span>
    </Link>
  );
}

export default function Component() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black p-4 rounded-t-3xl">
      <div className="flex justify-around items-center max-w-screen-lg mx-auto">
        <NavbarIcon icon={Home} label="Home" />
        <NavbarIcon icon={Search} label="Search" />
        <NavbarIcon icon={PlusSquare} label="Create" />
        <NavbarIcon icon={Heart} label="Notifications" />
        <NavbarIcon icon={User} label="Profile" />
        <Testicon />
      </div>
    </nav>
  );
}
