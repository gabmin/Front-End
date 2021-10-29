import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import SearchCard from "../components/SearchCard";
import { search } from "../redux/actions/search";

const Search = ({ location }) => {
  const dispatch = useDispatch();
  const qs = location.search.indexOf("=");
  const searchValue = decodeURI(location.search.substring(qs + 1));

  const searchList = useSelector(state => state.search.searchList);

  useEffect(() => {
    dispatch(search(searchValue));
  }, [dispatch, searchValue]);

  return (
    <Container>
      <span>
        {searchValue} (검색된 수 : {searchList.length})
      </span>
      {searchList.map((v, i) => (
        <SearchCard
          key={i}
          type={Object.keys(v).includes("eitherId") ? "찬반" : "객관식"}
          id={v.multiId || v.eitherId}
          title={v.title}
          user={v.user}
          date={v.date}
          editedDate={v.editedDate}
          completed={v.completed}
          likeCnt={v.likeCnt}
        />
      ))}
      {searchList.length === 0 && <NoList>검색 결과가 없습니다</NoList>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  height: 1200px;
  border: 1px solid lightgray;
  margin: auto;
  padding: 50px 100px;
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
