import React from "react";

export function Pagination({ totalPages, currentPage, onPageIndexChange }) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handleClick = event => {
    const pageIndex = Number(event.target.id);
    onPageIndexChange(pageIndex - 1);
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap",marginTop:'10px' }}>
      {pageNumbers.map(number => (
        <span
          id={number}
          style={{
            backgroundColor: currentPage === number ? "#2b6cb0" : "lightgrey",
            cursor: "pointer",
            display: "inline block",
            margin: "3px",
            padding: "6px",
            border: "1px solid lightgrey",
            width: "40px",
            borderRadius:'4px',
            textAlign: "center"
          }}
          key={number}
          onClick={handleClick.bind(number)}
        >
          {number}
        </span>
      ))}
    </div>
  );
}
