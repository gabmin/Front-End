import React from "react";
import styled from "styled-components";
import CommentList from "./CommentList";

const MultiComment = props => {
  const dataList = props.dataList;
  console.log("멀티코멘트", dataList);
  return (
    <React.Fragment>
      <TempDiv>
        <p>댓글 {dataList.commentCnt}개</p>
        <textarea></textarea>
        <button>작성</button>
        <hr></hr>
        <div>
          <CommentList dataList={dataList} />
        </div>
      </TempDiv>
    </React.Fragment>
  );
};

const TempDiv = styled.div`
  background-color: green;
`;

export default MultiComment;
