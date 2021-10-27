import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const MultiDetail = props => {
  const multiId = props.match.params.multi_id;
  const [per, setPer] = useState(0);
  setTimeout(() => {
    setPer(50);
  }, 2000);

  return (
    <div>
      N지선다 상세페이지 글 아이디 : {multiId}
      <ProgressBar completed={per} />
    </div>
  );
};

export default MultiDetail;
