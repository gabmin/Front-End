import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import AnswerList from "../components/AnswerList";

const MultiDetail = props => {
  const multiId = props.match.params.multi_id;
  const [per, setPer] = useState(0);
  setTimeout(() => {
    setPer(50);
  }, 2000);
  return (
    <div>
      <ProgressBar completed={per} />
      <div>N지선다 상세페이지 글 아이디 : {multiId}</div>
      <p>title</p>
      <hr></hr>
      <p>description</p>
      <div>
        <AnswerList></AnswerList>
      </div>
      <hr></hr>
      <p>user</p>
      <p>date</p>
      <p>editedDate</p>
      <p>completed</p>
      <p>likeCnt</p>
      <p>commentCnt</p>
    </div>
  );
};

export default MultiDetail;
