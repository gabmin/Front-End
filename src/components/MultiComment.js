import React from "react";
import styled from "styled-components";

import CommentList from "./CommentList";
import CommentInput from "../elements/CommentInput";

const MultiComment = props => {
  const dataList = props.dataList;
  console.log("멀티코멘트", dataList);

  return (
    <>
      <TempWarpper>
        <TextAreaWarpper>
          <p>댓글 {dataList.commentCnt}개</p>
          <CommentInput />
        </TextAreaWarpper>
        <hr></hr>
        <div>
          <CommentList dataList={dataList} />
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
