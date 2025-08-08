// components/Pagination.tsx
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxPageButtons?: number; // number of middle buttons, default: 5
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxPageButtons = 5,
}) => {
  if (totalPages <= 1) return null;

  const buttonClass = (active?: boolean) =>
    `px-3 py-1 rounded-md border text-sm transition ${
      active
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
    }`;

  const renderPageButtons = () => {
    const pages: (number | string)[] = [];

    const sideCount = Math.floor(maxPageButtons / 2);
    let start = Math.max(2, currentPage - sideCount);
    let end = Math.min(totalPages - 1, currentPage + sideCount);

    if (currentPage <= sideCount + 1) {
      start = 2;
      end = Math.min(totalPages - 1, maxPageButtons);
    } else if (currentPage + sideCount >= totalPages) {
      end = totalPages - 1;
      start = Math.max(2, totalPages - maxPageButtons + 1);
    }

    // Always show first page
    pages.push(1);

    // Ellipsis before
    if (start > 2) pages.push("...");

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Ellipsis after
    if (end < totalPages - 1) pages.push("...");

    // Always show last page
    if (totalPages > 1) pages.push(totalPages);

    return pages.map((p, idx) =>
      typeof p === "number" ? (
        <button
          key={idx}
          onClick={() => onPageChange(p)}
          className={buttonClass(p === currentPage)}
        >
          {p}
        </button>
      ) : (
        <span key={idx} className="px-2 py-1 text-sm text-gray-500">
          ...
        </span>
      )
    );
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4 flex-wrap">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        className={`${buttonClass()} ${currentPage === 1 ? "disabled:cursor-not-allowed" : ""}`}>
        First
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${buttonClass()} ${currentPage === 1 ? "disabled:cursor-not-allowed" : ""}`}>
        Prev
      </button>

      {renderPageButtons()}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${buttonClass()} ${currentPage === totalPages ? "disabled:cursor-not-allowed" : ""}`}>
        Next
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
        className={`${buttonClass()} ${currentPage === totalPages ? "disabled:cursor-not-allowed" : ""}`}>
        Last
      </button>
    </div>
  );
};
