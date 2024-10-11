"use client";
import PageTransition from "../components/PageTransition";
import AccountComponent from "../components/AccountComponent";
export default function Account() {
  return (
    <PageTransition>
      <div className="">
        <h1 className="text-2xl font-bold mb-4 p-4">Account</h1>
        {/* Your contact page content here */}
        <AccountComponent />
      </div>
    </PageTransition>
  );
}
