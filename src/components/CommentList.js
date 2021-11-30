import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

import colors from "../shared/colors";
import Comment from "./Comment";

function Items({ currentItems }) {
  console.log(currentItems);
  const dataList = useSelector(state => state.multiDetail.multiDetail);
  const completed = dataList.multi.completed;
  return (
    <>
      <TempWarpper>
        {currentItems &&
          currentItems.map((p, i) => (
            <div>
              <Comment
                // dataList={dataList}
                completed={completed}
                multiId={p.multi}
                nickname={p.nickname}
                comment={p.comment}
                commentDate={p.date}
                likeCnt={p.likeCnt}
                id={p.id}
                deleted={p.deleted}
                liked={p.liked}
                user={p.user}
              />
            </div>
          ))}
      </TempWarpper>
    </>
  );
}

const CommentList = ({ items, itemsPerPage = 5 }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
    // setItemOffset(pageCount);
  }, [itemOffset, itemsPerPage, items, pageCount]);

  const handlePageClick = event => {
    // window.scroll(0, 0);
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <StyledPagination>
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
        initialPage={Math.ceil(items.length / itemsPerPage) - 1}
      />
    </StyledPagination>
  );
};

const StyledPagination = styled.div`
  .pagination {
    margin: 35px auto 25px auto;
    font-size: 12px;
    display: flex;
    justify-content: center;
    list-style: none;
    outline: none;
    padding: 0;
    user-select: none;
  }
  .pagination > .active > a {
    background-color: ${colors.blue};
    border-color: ${colors.blue};
    color: #fff;
  }
  .pagination > li > a {
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
    background-color: ${colors.blue};
    border-color: ${colors.blue};
    outline: none;
  }
  .pagination > li > a,
  .pagination > li > span {
    color: ${colors.blue};
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

const TempWarpper = styled.div`
  width: 100%;
  margin: auto;
`;

export default CommentList;
