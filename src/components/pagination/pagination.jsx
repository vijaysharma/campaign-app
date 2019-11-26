import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./pagination.css";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
const Pagination = ({
  campaignsPerPage,
  totalCampaigns,
  currentPage,
  onPaginate
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCampaigns / campaignsPerPage); i++) {
    pageNumbers.push(i);
  }
  const getActiveClassName = (currentPage, index) => {
    if (currentPage !== index) {
      return "page-link";
    } else {
      return "page-link active";
    }
  };
  const getDisabledClassName = (currentPage, indexToMatch) => {
    if (currentPage === indexToMatch) {
      return "disabled";
    }
  };
  return (
    <React.Fragment>
      <ul className="pagination" data-testid="pagination">
        <li className="page-item prev">
          <a
            onClick={() => onPaginate(currentPage - 1)}
            href="!#"
            className={getDisabledClassName(currentPage, 1)}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </a>
        </li>
        {pageNumbers.map(number => {
          return (
            <li className="page-item" key={number}>
              <a
                onClick={() => onPaginate(number)}
                className={getActiveClassName(currentPage, number)}
                href="!#"
              >
                {number}
              </a>
            </li>
          );
        })}
        <li className="page-item next">
          <a
            onClick={() => onPaginate(currentPage + 1)}
            href="!#"
            className={getDisabledClassName(currentPage, pageNumbers.length)}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Pagination;
