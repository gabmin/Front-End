import React from "react";

const MultiEdit = props => {
  const multiId = props.match.params.multi_id;
  return <div>N지선다 수정페이지 글 아이디 : {multiId}</div>;
};

export default MultiEdit;
