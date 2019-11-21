import React from 'react';

export const Header=() => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-4">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
         Search Country
        </span>
      </div>
    </nav>
  );
};