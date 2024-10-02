import React from "react";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import Link from "next/link";
import Testicon from "@/app/components/testicon";

const book = () => (
  <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
    <path
      d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0116 16v288a16 16 0 01-16 16c-128 0-177.45 25.81-208 64-30.37-38-80-64-208-64-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0116-16c131.57.59 192 32.84 208 96zM256 160v288"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
    />
  </svg>
);

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
        <NavbarIcon icon={book} label="Notifications" />
        <NavbarIcon icon={Testicon} label="Profile" />
      </div>
    </nav>
  );
}
