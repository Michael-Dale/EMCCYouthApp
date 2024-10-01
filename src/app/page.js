import Image from "next/image";
import Navbar from "./components/Navbar";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";


export default function Home() {
  return (
  
  <>    
  
  <LoginLink>Sign in</LoginLink>
  <RegisterLink>Sign up</RegisterLink>
    <Navbar/>
  
  </>
  

  );
}
