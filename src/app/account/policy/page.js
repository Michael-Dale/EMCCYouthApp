// pages/terms-and-privacy.js
import React from "react";

const TermsAndPrivacy = () => {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">Terms and Conditions & Privacy Policy</h1>

      {/* Terms and Conditions Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
        <p className="mb-4">
          These Terms and Conditions ("Terms") govern your use of the Connect Youth website and services ("Service", "we", "our", "us"). By accessing
          or using our Service, you agree to comply with and be bound by these
          Terms.
        </p>

        <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
        <p className="mb-4">
          These Terms and Conditions govern your access to and use of our website
          and services. By using this Service, you agree to be bound by these terms.
        </p>

        <h3 className="text-xl font-semibold mb-2">2. Services Provided</h3>
        <p className="mb-4">
          Connect Youth offers various services, including, but not limited to,
          user acount managment and content sharing.
        </p>

        <h3 className="text-xl font-semibold mb-2">3. Account Registration</h3>
        <p className="mb-4">
          To access certain features of the Service, you may be required to
          register for an account. You agree to provide accurate, current, and
          complete information during the registration process and to update this
          information as necessary.
        </p>

        <h3 className="text-xl font-semibold mb-2">4. Usage of the Service</h3>
        <p className="mb-4">
          You agree to use the Service only for lawful purposes and in accordance
          with these Terms. You are prohibited from:
        </p>
        <ul className="list-inside list-disc mb-4">
          <li>Violating any applicable law or regulation.</li>
          <li>Distributing any harmful or malicious software.</li>
          <li>Interfering with the security of the Service or attempting to access any restricted areas.</li>
        </ul>
      </section>

      {/* Privacy Policy Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>

        <h3 className="text-xl font-semibold mb-2">1. Information We Collect</h3>
        <p className="mb-4">
          We collect the following types of personal information:
        </p>
        <ul className="list-inside list-disc mb-4">
          <li>Personal Identification Information: Name, email address, phone number, etc.</li>
          <li>Usage Data: Information about how you interact with our website and services.</li>
          <li>Device Information: Information about the device you use to access our services, such as IP address, browser type, and operating system.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">2. How We Use Your Information</h3>
        <p className="mb-4">
          We use your personal information for the following purposes:
        </p>
        <ul className="list-inside list-disc mb-4">
          <li>To provide and improve the Service.</li>
          <li>To communicate with you regarding updates, promotions, and service-related notifications.</li>
          <li>To analyze usage trends and improve the functionality of our website and services.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">3. Data Storage and Security</h3>
        <p className="mb-4">
          Your personal data is stored securely in our database hosted on AWS. We employ technical and organizational measures to safeguard your personal information.
        </p>
      </section>
    </div>
  );
};

export default TermsAndPrivacy;
