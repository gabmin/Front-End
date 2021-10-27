import React from "react";
import styled from "styled-components";
import ChildList from "./ChildList";

const Comment = props => {
  const dataList = props.dataList;

  const { User, date, commentLikeCnt, comment, id } = props;

  console.log("코멘트데이터", dataList);

  return (
    <React.Fragment>
      <TempDiv>
        <div>{User[0].nickname}</div>
        <div>{date}</div>
        <div>좋아요 {commentLikeCnt}</div>
        <div>{comment}</div>
        <button>댓글작성</button>
        <div>
          <ChildList parentComment={id} dataList={dataList} />
        </div>
      </TempDiv>
    </React.Fragment>
  );
};

const TempDiv = styled.div`
  background-color: white;
`;

export default Comment;
