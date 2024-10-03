import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../app/components/Navbar";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "EMCC APP",
  description: "EMCC YOUTH APP",
};

export default async function RootLayout({ children }) {
  const { isAuthenticated } = getKindeServerSession();
  const isAuthed = await isAuthenticated();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex justify-between items-center py-8 px-24">
          <h1 className="font-bold text-2xl">EMCC</h1>
          {isAuthed ? (
            <LogoutLink>Logout</LogoutLink>
          ) : (
            <div className="flex gap-2">
              <LoginLink>Login</LoginLink>
              <RegisterLink>Register</RegisterLink>
            </div>
          )}
        </nav>
        {children}
        {/* If the user is authenticated the nav bar will show */}
        {isAuthed ? <Navbar /> : null}
        {/* <Navbar /> */}
      </body>
    </html>
  );
}
