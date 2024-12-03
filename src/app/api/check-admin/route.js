import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getPermissions, getUser } = getKindeServerSession();

  const permissions = await getPermissions();
  const user = await getUser();
  //   console.log("Permission:", permissions); //Prints>> Permission: { permissions: [ 'admin' ], orgCode: 'org_6e4a091399b' }
  //   console.log("user:", user);
  // prints:
  // user: {
  //     id: 'kp_0d37c87ba5ca4710a94ca2252cfd14ed',
  //     email: 'jono7384@gmail.com',
  //     family_name: 'Loxton',
  //     given_name: 'Jonathan',
  //     picture: 'https://lh3.googleusercontent.com/a/ACg8ocJtfDdcFbVoD8D8p0Tp1DFFUvTeaCBYSqMsfVvV_P-HAj-Twg=s96-c',
  //     username: undefined,
  //     phone_number: undefined
  //   }
  const isAdmin = permissions?.permissions?.includes("admin");
  console.log(isAdmin); //print true if user is an admin, false if user is not

  return NextResponse.json({ isAdmin });
}
