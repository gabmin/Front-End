import React from "react";

const Search = props => {
  const searchValue = props.match.params.value;
  return <div>검색페이지 검색내용 : {searchValue}</div>;
};

export default Search;
