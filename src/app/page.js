import Image from "next/image";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-4">
      <div className="absolute top-8 left-8">
        <div className="text-white text-2xl font-bold">
          <span className="text-teal-500">Connect</span>Youth
        </div>
      </div>
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-8">
          Welcome to Connect
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12">
          Join us and experience the next level of innovation.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <RegisterLink>
            <button className="bg-teal-400 w-40 hover:bg-teal-500 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Sign Up
            </button>
          </RegisterLink>
          <LoginLink>
            <button className="bg-gray-700 w-40 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Login
            </button>
          </LoginLink>
        </div>
      </div>
    </div>
  );
}
