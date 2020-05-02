import React, { Component } from "react";
import _ from "lodash"; //underscore js library upgrade
import PropTypes from "prop-types";
class Pagination extends Component {
  state = {
    pages: [
      { id: 1, enabled: true },
      { id: 2, enabled: false },
      { id: 3, enabled: true },
    ],
  };
  render() {
    const { itemCount, pageSize, currentPage, onPageChange } = this.props;
    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount === 1) return null;
    //use lodash to crete an array
    const pageCountArray = _.range(1, pageCount + 1);
    return (
      <nav aria-label="...">
        <ul className="pagination pagination-sm">
          {pageCountArray.map((page) => {
            return (
              <li
                key={page}
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <a
                  className="page-link"
                  onClick={() => onPageChange(page)}
                  tabIndex="-1"
                >
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Pagination;
