import React, { useState } from "react";
import CommentInput from "../elements/CommentInput";

const ChildComment = props => {
  const { User, date, id, parentComment, comment } = props;
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
      <div>
        <div>{User[0].nickname}</div>
        <div>{date}</div>
        <div>{comment}</div>
        {hiddenBtn ? (
          <button onClick={showInput}>댓글작성</button>
        ) : (
          <button onClick={showBtn}>취소</button>
        )}

        {hiddenInput ? <CommentInput /> : null}
      </div>
    </React.Fragment>
  );
};

export default ChildComment;
