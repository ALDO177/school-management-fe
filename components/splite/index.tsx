import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

type DropdownOption = {
  label: string | React.ReactNode;
  onClick: () => void;
};

type ButtonDropdownProps = {
  label: string | React.ReactNode;
  options: DropdownOption[];
};

const ButtonDropdown: React.FC<ButtonDropdownProps> = ({ label, options }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle open/close
  const toggleDropdown = () => setOpen((prev) => !prev);

  // Close when click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        {label}
        <FaChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-[1000]">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                option.onClick();
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-[16px] text-gray-700 hover:bg-gray-100">
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ButtonDropdown;