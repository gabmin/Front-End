import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

import SearchCard from "../components/SearchCard";

import { search } from "../redux/actions/search";
import {
  blue,
  red,
  mobile,
  tablet,
  gray5,
  grayMultiply,
  darkGray,
} from "../shared/style";
import MainPagination from "../components/MainPagination";
import LoadingBubble from "../elements/LoadingBubble";

const Search = ({ location }) => {
  const dispatch = useDispatch();
  const qs = location.search.indexOf("=");
  const searchValue = decodeURI(location.search.substring(qs + 1));

  const [loadDone, setLoadDone] = useState(false);

  const { searchList, searchDone } = useSelector(state => state.search);

  useEffect(() => {
    dispatch(search(searchValue));
  }, [dispatch, searchValue]);

  useEffect(() => {
    if (searchDone === true) {
      setTimeout(() => {
        setLoadDone(true);
      }, 100);
      return;
    }
    setLoadDone(false);
  }, [searchDone]);

  return (
    <Container>
      {!loadDone && <LoadingBubble />}
      <SearchResultText>
        '<span className="resultText">{searchValue}</span>' 검색한 결과입니다. (
        {searchList.length})
      </SearchResultText>
      <MainPagination items={searchList} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  min-height: 600px;
  margin: auto;
  padding: 50px 100px 0;

  @media screen and (max-width: ${tablet}) {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    min-height: 400px;
  }
`;

const SearchResultText = styled.div`
  height: 80px;
  margin: 0 auto;
  font-size: 24px;

  .resultText {
    font-weight: bold;
  }

  @media screen and (max-width: ${tablet}) {
    font-size: 18px;
    height: 50px;
  }
`;

const NoList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 320px;
  margin-top: 0.8em;
  background-color: rgba(150, 150, 150, 0.123);
  font-size: 3em;
  border-radius: 0.5em;
`;

export default Search;
