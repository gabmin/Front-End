import React from "react";
import styled from "styled-components";
import CommentInput from "../elements/CommentInput";
import CommentList from "./CommentList";

const MultiComment = props => {
  const dataList = props.dataList;
  console.log("멀티코멘트", dataList);
  return (
    <>
      <TempDiv>
        <TextAreaDiv>
          <p>댓글 {dataList.commentCnt}개</p>
          <CommentInput />
        </TextAreaDiv>
        <hr></hr>
        <div>
          <CommentList dataList={dataList} />
        </div>
      </TempDiv>
    </>
  );
};

const TempDiv = styled.div`
  max-width: 60%;
  margin: auto;
  /* background-color: green; */
`;

const TextAreaDiv = styled.div`
  max-width: 80%;
  margin: auto;
  background-color: green;
`;

export default MultiComment;
