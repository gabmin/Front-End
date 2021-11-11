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
      <div style={{ height: "100px", margin: "0 auto", fontSize: "24px" }}>
        '{searchValue}' 를 검색한 결과입니다. ({searchList.length})
      </div>
      {searchList.map((v, i) => (
        <SearchCard
          key={i}
          type={Object.keys(v).includes("eitherId") ? "찬반" : "객관식"}
          id={v.multiId || v.eitherId}
          title={v.title}
          userId={v.user}
          nickname={v.nickname}
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
