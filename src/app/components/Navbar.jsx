"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const home = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="ionicon"
    viewBox="0 0 24 24"
    width="30px"
    height="30px"
  >
    <path
      d="M3 10.5653C3 9.99094 3 9.70376 3.07403 9.4393C3.1396 9.20503 3.24737 8.98469 3.39203 8.7891C3.55534 8.5683 3.78202 8.39199 4.23539 8.03937L11.0177 2.76424C11.369 2.49099 11.5447 2.35436 11.7387 2.30184C11.9098 2.2555 12.0902 2.2555 12.2613 2.30184C12.4553 2.35436 12.631 2.49099 12.9823 2.76424L19.7646 8.03937C20.218 8.39199 20.4447 8.5683 20.608 8.7891C20.7526 8.98469 20.8604 9.20503 20.926 9.4393C21 9.70376 21 9.99094 21 10.5653V17.8002C21 18.9203 21 19.4804 20.782 19.9082C20.5903 20.2845 20.2843 20.5905 19.908 20.7822C19.4802 21.0002 18.9201 21.0002 17.8 21.0002H6.2C5.07989 21.0002 4.51984 21.0002 4.09202 20.7822C3.71569 20.5905 3.40973 20.2845 3.21799 19.9082C3 19.4804 3 18.9203 3 17.8002V10.5653Z"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    />
  </svg>
);

const blog = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="ionicon"
    viewBox="0 0 512 512"
    width="30px"
    height="30px"
  >
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

const contact = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="ionicon"
    viewBox="0 0 512 512"
    width="30px"
    height="30px"
  >
    <path
      d="M408 64H104a56.16 56.16 0 00-56 56v192a56.16 56.16 0 0056 56h40v80l93.72-78.14a8 8 0 015.13-1.86H408a56.16 56.16 0 0056-56V120a56.16 56.16 0 00-56-56z"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
    />
  </svg>
);

const info = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="ionicon"
    viewBox="0 0 512 512"
    width="30px"
    height="30px"
  >
    <path
      d="M366.05 146a46.7 46.7 0 01-2.42-63.42 3.87 3.87 0 00-.22-5.26l-44.13-44.18a3.89 3.89 0 00-5.5 0l-70.34 70.34a23.62 23.62 0 00-5.71 9.24h0a23.66 23.66 0 01-14.95 15h0a23.7 23.7 0 00-9.25 5.71L33.14 313.78a3.89 3.89 0 000 5.5l44.13 44.13a3.87 3.87 0 005.26.22 46.69 46.69 0 0165.84 65.84 3.87 3.87 0 00.22 5.26l44.13 44.13a3.89 3.89 0 005.5 0l180.4-180.39a23.7 23.7 0 005.71-9.25h0a23.66 23.66 0 0114.95-15h0a23.62 23.62 0 009.24-5.71l70.34-70.34a3.89 3.89 0 000-5.5l-44.13-44.13a3.87 3.87 0 00-5.26-.22 46.7 46.7 0 01-63.42-2.32z"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      c
      stroke-width="32"
    />
  </svg>
);

const account = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ionicon"
    viewBox="0 0 512 512"
    width="30"
    height="30"
  >
    <circle
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="32"
      cx="256"
      cy="56"
      r="40"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="32"
      d="M204.23 274.44c2.9-18.06 4.2-35.52-.5-47.59-4-10.38-12.7-16.19-23.2-20.15L88 176.76c-12-4-23.21-10.7-24-23.94-1-17 14-28 29-24 0 0 88 31.14 163 31.14s162-31 162-31c18-5 30 9 30 23.79 0 14.21-11 19.21-24 23.94l-88 31.91c-8 3-21 9-26 18.18-6 10.75-5 29.53-2.1 47.59l5.9 29.63 37.41 163.9c2.8 13.15-6.3 25.44-19.4 27.74S308 489 304.12 476.28l-37.56-115.93q-2.71-8.34-4.8-16.87L256 320l-5.3 21.65q-2.52 10.35-5.8 20.48L208 476.18c-4 12.85-14.5 21.75-27.6 19.46s-22.4-15.59-19.46-27.74l37.39-163.83z"
    />
  </svg>
);

function NavbarIcon({ icon: Icon, label, link, activeColor }) {
  const pathname = usePathname();
  return (
    <Link
      href={link}
      className={`flex flex-col items-center ${
        pathname === link ? `text-[${activeColor}]` : "text-white"
      }`}
      style={pathname === link ? { color: activeColor } : {}}
    >
      <Icon className="w-6 h-6 mb-1" />
      <span className="text-xs">{label}</span>
    </Link>
  );
}

export default function Component() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black p-4 ">
      <div className="flex justify-around items-center max-w-screen-lg mx-auto">
        <NavbarIcon
          icon={home}
          label="Home"
          link="/home"
          activeColor="#ff8000"
        />
        <NavbarIcon
          icon={blog}
          label="Blog"
          link="/blog"
          activeColor="#00e054"
        />
        <NavbarIcon
          icon={contact}
          label="Contact"
          link="/contact"
          activeColor="#ec4899"
        />
        <NavbarIcon
          icon={info}
          label="Info"
          link="/info"
          activeColor="#40bcf4"
        />
        <NavbarIcon
          icon={account}
          label="Account"
          link="/account"
          activeColor="#ef4444"
        />
      </div>
    </nav>
  );
}

// Button colors
// #ff8000
// #00e054
// #ec4899
// #40bcf4
// #ef4444
