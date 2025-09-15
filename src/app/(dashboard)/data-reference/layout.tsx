'use client'

import React from "react";

export default function DataReferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Reference</h1>
        <p className="text-gray-600">Manage roles and permissions</p>
      </div>
      {children}
    </div>
  );
}