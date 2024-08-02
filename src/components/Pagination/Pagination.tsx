import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPagination = () => {
    const pages = [];

    if (currentPage === 1 || currentPage === 2 || currentPage === totalPages || currentPage === totalPages - 1) {
      pages.push(1);
      pages.push(2);
      pages.push(3);
      pages.push('...');
      pages.push(totalPages - 2);
      pages.push(totalPages - 1);
      pages.push(totalPages);
    } else if (currentPage === 3) {
      pages.push(1);
      pages.push(2);
      pages.push(3);
      pages.push(4);
      pages.push('...');
      pages.push(totalPages - 2);
      pages.push(totalPages - 1);
      pages.push(totalPages);
    } else if (currentPage === totalPages - 2) {
      pages.push(1);
      pages.push(2);
      pages.push(3);
      pages.push('...');
      pages.push(totalPages - 3);
      pages.push(totalPages - 2);
      pages.push(totalPages - 1);
      pages.push(totalPages);
    } else {
      pages.push(1);
      pages.push('...');
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      {getPagination().map((page, index) =>
        page === '...' ? (
          <span key={index} className={styles.ellipsis}>...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            className={`${styles.button} ${page === currentPage ? styles.active : ''}`}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
