import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-4">🚚 Track Shipment</h1>
      <p className="text-lg mb-6">Your shipment is currently in progress...</p>
      <Link href="/">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          ← Back Home
        </button>
      </Link>
    </div>
  );
};

export default Page;
