import React from "react";

const MultiDetail = props => {
  const multiId = props.match.params.multi_id;
  return <div>N지선다 상세페이지 글 아이디 : {multiId}</div>;
};

export default MultiDetail;
