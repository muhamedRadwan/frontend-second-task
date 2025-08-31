import React from 'react';

// A friendly loading screen that shows while we prepare the quiz experience
export default function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-600">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
        <p className="mt-4 text-center text-gray-600">Loading quiz...</p>
      </div>
    </div>
  );
}
