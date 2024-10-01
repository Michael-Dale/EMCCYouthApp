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
      <h1 className="text-center text-3xl font-bold mt-4">Please login</h1>
    </>
  );
}
