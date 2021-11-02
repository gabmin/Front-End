import React, { useState } from "react";
import styled from "styled-components";

import ChildList from "./ChildList";
import ChildCommentInput from "../elements/ChildCommentInput";

const Comment = props => {
  const dataList = props.dataList;
  const multiId = props.multiId;

  const { nickname, date, commentLikeCnt, comment, id } = props;

  console.log("코멘트데이터", dataList);
  console.log("nickname", nickname, props.nickname);

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
    <>
      <TempWarpper>
        <div>{nickname}</div>
        <div>{date}</div>
        <div>좋아요 {commentLikeCnt}</div>
        <div>{comment}</div>
        {hiddenBtn ? (
          <button onClick={showInput}>댓글작성</button>
        ) : (
          <button onClick={showBtn}>취소</button>
        )}

        {hiddenInput ? (
          <ChildCommentInput parentComment={id} multiId={multiId} />
        ) : null}
        <div>
          <ChildList parentComment={id} dataList={dataList} />
        </div>
      </TempWarpper>
    </>
  );
};

const TempWarpper = styled.div`
  background-color: white;
`;

export default Comment;
