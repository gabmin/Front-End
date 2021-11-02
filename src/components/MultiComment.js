import React from "react";
import styled from "styled-components";

import CommentList from "./CommentList";
import CommentInput from "../elements/CommentInput";

const MultiComment = props => {
  const dataList = props.dataList;
  const multiId = props.multiId;
  console.log("commentdataList", dataList);

  return (
    <>
      <TempWarpper>
        <TextAreaWarpper>
          <p>댓글 {dataList.multi.commentCnt}개</p>
          <CommentInput multiId={multiId} />
        </TextAreaWarpper>
        <hr></hr>
        <div>
          <CommentList multiId={multiId} dataList={dataList} />
        </div>
      </TempWarpper>
    </>
  );
};

const TempWarpper = styled.div`
  max-width: 60%;
  margin: auto;
  /* background-color: green; */
`;

const TextAreaWarpper = styled.div`
  max-width: 80%;
  margin: auto;
  background-color: green;
`;

export default MultiComment;
