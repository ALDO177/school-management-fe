// components/Tabs.tsx

'use client'
import React, { useState } from "react";

type TabItem = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  defaultIndex?: number;
};

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className="w-full">
      {/* Tab Buttons */}
      <div className="flex space-x-12 border-b border-gray-200">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`py-2 text-md font-medium rounded-t-md ${
              activeIndex === idx
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs[activeIndex] && <div>{tabs[activeIndex].content}</div>}
      </div>
    </div>
  );
};
