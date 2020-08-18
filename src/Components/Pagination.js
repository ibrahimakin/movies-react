import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, setPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item' style={{ display: 'inline', marginRight: 15, }}>
            <a style={{ borderStyle: 'double', fontSize: 15, padding: 5, }} onClick={() => { if ((number % 2) === 1) { setPage((number / 2) + 1); number = 1 } else { setPage(number / 2); number = 2 }; paginate(number) }} href='!#' /* <- 'href' is unnecessary */ className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav >
  );
};

export { Pagination };
