"use client";

import Link from "next/link";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl px-4">
        <Link
          href="/admin/events"
          className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-md shadow-md text-center"
        >
          Manage Events
        </Link>
        <Link
          href="/admin/devotion"
          className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-md shadow-md text-center"
        >
          Manage Devotions
        </Link>
        <Link
          href="/admin/sermon"
          className="bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-md shadow-md text-center"
        >
          Manage Sermons
        </Link>
        <Link
          href="/admin/testimony"
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-md shadow-md text-center"
        >
          Manage Testimonies
        </Link>
        <Link
          href="/admin/registration"
          className="bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-md shadow-md text-center"
        >
          Google Form Link
        </Link>
        <Link
          href="/admin/gallery"
          className="bg-orange-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-md shadow-md text-center"
        >
          Manage Images
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
