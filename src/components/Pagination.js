import React from "react";

const Pagination = ({
  postsPerPage,
  totalPosts,
  previouspage,
  nextpage,
  currentPage
}) => {
  let totalPages = Math.ceil(totalPosts / postsPerPage);
  return (
    <nav>
      <ul className="pagination">
        {currentPage !== 1 ? (
          <button
            onClick={() => previouspage()}
            className="btn btn-danger previous"
          >
            Previous
          </button>
        ) : (
          ""
        )}
        {totalPages > 1 && currentPage < totalPages ? (
          <button onClick={() => nextpage()} className="btn btn-danger">
            Next
          </button>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
