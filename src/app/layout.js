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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* <main className={`flex-grow ${isAuthed ? "pb-20" : ""}`}> uncomment when auth is implemented */}
        <main className="flex-grow pb-20">{children}</main>
        <Navbar />
        {/* {isAuthed && (
          <footer className="fixed bottom-0 left-0 right-0 h-16">
            <Navbar />
          </footer>
        )} */}
      </body>
    </html>
  );
}
