import React from 'react';

// A friendly message when something unexpected happens

interface ErrorScreenProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorScreen({ message, onRetry }: ErrorScreenProps) {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-600">
      <div className="rounded-lg bg-white p-8 text-center shadow-lg">
        <p className="mb-4 text-red-600">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
