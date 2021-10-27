import React, { useState } from "react";
import styled from "styled-components";
import CommentInput from "../elements/CommentInput";
import ChildList from "./ChildList";

const Comment = props => {
  const dataList = props.dataList;

  const { User, date, commentLikeCnt, comment, id } = props;

  console.log("코멘트데이터", dataList);

  const [hiddenInput, setHiddenInput] = useState(false);
  const [hiddenBtn, setHiddenBtn] = useState(true);
  const showInput = () => {
    if (hiddenInput === false) {
      setHiddenInput(true);
      showBtn();
    } else {
      setHiddenInput(false);
    }
  };
  const showBtn = () => {
    if (hiddenBtn === true) {
      setHiddenBtn(false);
    } else {
      setHiddenBtn(true);
      showInput();
    }
  };

  return (
    <React.Fragment>
      <TempDiv>
        <div>{User[0].nickname}</div>
        <div>{date}</div>
        <div>좋아요 {commentLikeCnt}</div>
        <div>{comment}</div>
        {hiddenBtn ? (
          <button onClick={showInput}>댓글작성</button>
        ) : (
          <button onClick={showBtn}>취소</button>
        )}

        {hiddenInput ? <CommentInput /> : null}
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
