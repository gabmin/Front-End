import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChildCommentInput from "../elements/ChildCommentInput";
import { DelChildDB } from "../redux/actions/childComment";

const ChildComment = props => {
  const { nickname, date, id, parentComment, comment, deleted } = props;

  const dispatch = useDispatch();
  const multiId = props.multiId;
  const userInfo = useSelector(state => state.user.userInfo);
  const childComments = useSelector(state => state.childComment.ChildCommentDB);
  const [hiddenInput, setHiddenInput] = useState(false);
  const [hiddenBtn, setHiddenBtn] = useState(true);

  console.log("childCommentss", childComments);

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

  const delComment = () => {
    dispatch(DelChildDB({ id, multiId }));
  };

  console.log("childComment", id, nickname, multiId);

  return (
    <>
      <div>
        <div>{nickname}</div>
        <div>{date}</div>
        {deleted !== 1 ? (
          <div>{comment}</div>
        ) : (
          <div>{"삭제된 댓글입니다"}</div>
        )}
        {userInfo.nickname === nickname ? (
          <button onClick={delComment}>삭제</button>
        ) : null}
        {/* {hiddenBtn ? (
          <button onClick={showInput}>댓글작성</button>
        ) : (
          <button onClick={showBtn}>취소</button>
        )} */}

        {/* {hiddenInput ? (
          <ChildCommentInput parentComment={parentComment} />
        ) : null} */}
      </div>
    </>
  );
};

export default ChildComment;
