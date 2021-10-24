import React from "react";

const EitherEdit = props => {
  const eitherId = props.match.params.either_id;
  return <div>2지선다 수정페이지 글 아이디 : {eitherId}</div>;
};

export default EitherEdit;
