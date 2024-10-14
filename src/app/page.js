import Image from "next/image";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <>
      {/* <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink> */}
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
      <h1 className="text-center text-3xl font-bold mt-4">Please login</h1>
    </>
  );
}
