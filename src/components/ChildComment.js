import React, { useState } from "react";

import ChildCommentInput from "../elements/ChildCommentInput";

const ChildComment = props => {
  const { nickname, date, id, parentComment, comment } = props;
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
      <div>
        <div>{nickname}</div>
        <div>{date}</div>
        <div>{comment}</div>
        {hiddenBtn ? (
          <button onClick={showInput}>댓글작성</button>
        ) : (
          <button onClick={showBtn}>취소</button>
        )}

        {hiddenInput ? (
          <ChildCommentInput parentComment={parentComment} />
        ) : null}
      </div>
    </>
  );
};

export default ChildComment;
