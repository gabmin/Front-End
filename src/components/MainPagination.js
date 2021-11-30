import styled from "styled-components";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import SearchCard from "./SearchCard";

import {
  blue,
  red,
  mobile,
  tablet,
  gray5,
  grayMultiply,
  darkGray,
} from "../shared/style";

function Items({ currentItems }) {
  return (
    <div className="items">
      {currentItems &&
        currentItems.map((v, i) => (
          <SearchCard
            key={i}
            type={Object.keys(v).includes("eitherId") ? "찬반" : "객관식"}
            id={v.multiId || v.eitherId}
            title={v.title}
            userId={v.user}
            nickname={v.nickname}
            date={v.date}
            completed={v.completed}
            likeCnt={v.likeCnt}
            commentCnt={v.commentCnt}
          />
        ))}
    </div>
  );
}

const MainPagination = ({ items, itemsPerPage = 10 }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <StyledPagenation>
      <Items currentItems={currentItems} />
      <ReactPaginate
        nextLabel="다음 >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< 이전"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </StyledPagenation>
  );
};

const StyledPagenation = styled.div`
  .pagination {
    margin: 40px auto;
    display: flex;
    justify-content: center;
    list-style: none;
    outline: none;
    padding: 0;
    user-select: none;
  }
  .pagination > .active > a {
    background-color: ${blue};
    border-color: ${blue};
    color: #fff;
  }
  .pagination > li > a {
    /* border: 1px solid ${blue}; */
    padding: 5px 10px;
    outline: none;
    cursor: pointer;
  }
  .pagination > .active > a,
  .pagination > .active > span,
  .pagination > .active > a:hover,
  .pagination > .active > span:hover,
  .pagination > .active > a:focus,
  .pagination > .active > span:focus {
    background-color: ${blue};
    border-color: ${blue};
    outline: none;
  }
  .pagination > li > a,
  .pagination > li > span {
    color: ${blue};
  }

  .page-link:hover {
    background-color: #eeeeee;
  }

  .pagination > li:first-child > a,
  .pagination > li:first-child > span,
  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
    border-radius: unset;
  }
`;

export default MainPagination;
