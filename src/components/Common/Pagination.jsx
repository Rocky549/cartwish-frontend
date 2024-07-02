import React from "react";
import "./Pagination.css";

const Pagination = ({ totalRecords, recordsPerPage, onClick ,currentpage}) => {
  let pages = [];
  let i = 1;
  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pages.push(i);
  }
  return (
    <>{pages.length > 1 && <ul className="pagination">
      {pages.map((page) => (
        <li key={page}>
          <button className={parseInt(currentpage)===page?"pagination_button active":"pagination_button"} onClick={() => onClick(page)}>
            {page}
          </button>
        </li>
      ))}
    </ul>}
    </>
  );
};

export default Pagination;
