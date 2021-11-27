import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import colors from "../shared/colors";
import MultiList from "../components/MultiList";
import { mobile } from "../shared/style";
import { SetParams } from "../redux/reducers/paramsSlice";

function Items({ currentItems }) {
  const { PostDBDone } = useSelector(state => state.multiCard);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Container>
      <ListWarpper>
        {PostDBDone === true && (
          <div>
            {currentItems &&
              currentItems?.map((p, i) => (
                <CardWarpper>
                  <MultiList
                    multiId={p.multiId}
                    title={p.title}
                    description={p.description}
                    user={p.user}
                    date={p.date}
                    editedDate={p.editedDate}
                    completed={p.completed}
                    likeCnt={p.likeCnt}
                    liked={p.liked}
                    commentCnt={p.commentCnt}
                    nickname={p.nickname}
                  />
                </CardWarpper>
              ))}
          </div>
        )}
      </ListWarpper>
      {/* <TopBtn onClick={goToTop}>TOP</TopBtn> */}
    </Container>
  );
}

const MultiPagination = ({ items, itemsPerPage = 5 }) => {
  const dispatch = useDispatch();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const paramsId = useSelector(state => state.params.paramsId);
  const target = items.findIndex(p => {
    return p.multiId == paramsId;
  });

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
    if (currentPage === Math.floor(target / itemsPerPage)) {
      window.scroll(
        0,
        (target % itemsPerPage) * (document.body.scrollHeight / itemsPerPage),
      );
    }
  }, [itemOffset, itemsPerPage, items, target, currentPage]);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
    window.scroll(0, 0);
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
        initialPage={target !== -1 ? Math.floor(target / itemsPerPage) : 0}
      />
    </StyledPagination>
  );
};

const StyledPagination = styled.div`
  .pagination {
    margin: 60px auto;
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

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const ListWarpper = styled.div`
  /* height: 100%; */
`;

const CardWarpper = styled.div`
  /* height: 100%; */
`;

const TopBtn = styled.button`
  display: block;
  margin: 5% 8% 20px auto;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  border: none;
  background-color: transparent;
  color: ${colors.blue};
  cursor: pointer;
  text-decoration: underline;
  text-underline-position: under;
  @media screen and (max-width: ${mobile}) {
    margin: 8% 8% -30px auto;
    padding-top: 30px;
  }
`;

export default MultiPagination;
