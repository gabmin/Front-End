import React from "react";
import AnswerList from "../components/AnswerList";

const MultiDetail = props => {
  const multiId = props.match.params.multi_id;
  const [answer, setAnswer] = React.useState();

  const changeAnswer = e => {
    setAnswer(e.target.value);
    console.log("앤서", e.target.value);
  };

  const create = () => {};

  return (
    <div>
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
