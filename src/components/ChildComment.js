import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";

import ChildCommentInput from "../elements/ChildCommentInput";
import { DelChildDB, EditChildDB } from "../redux/actions/childComment";

const ChildComment = props => {
  const { nickname, date, id, parentComment, comment, deleted } = props;

  const dispatch = useDispatch();
  const multiId = props.multiId;
  const userInfo = useSelector(state => state.user.userInfo);
  // const childComments = useSelector(state => state.childComment.ChildCommentDB);
  const [hiddenInput, setHiddenInput] = useState(false);
  const [hiddenBtn, setHiddenBtn] = useState(true);
  const [editInput, setEditInput] = useState(false);
  const [editBtn, setEditBtn] = useState(true);
  const [editCancelBtn, setEditCancelBtn] = useState(false);
  const [delBtn, setDelBtn] = useState(true);
  console.log("childComment", comment);
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

  const showEditInput = () => {
    if (editInput === false) {
      setEditInput(true);
      setEditBtn(false);
      setEditCancelBtn(true);
      setDelBtn(false);
    } else {
      setEditInput(false);
      setEditBtn(true);
      setEditCancelBtn(false);
      setDelBtn(true);
    }
  };
  const editedDate = moment().format("YYYY-MM-DD HH:mm:ss");

  const [newEditChild, setNewEditChild] = useState();
  const changeEditChild = e => {
    setNewEditChild(e.target.value);
  };

  const editChildComment = () => {
    dispatch(
      EditChildDB({ multiId, id, data: { comment: newEditChild, editedDate } }),
    );
    showEditInput();
  };

  const delComment = () => {
    dispatch(DelChildDB({ id, multiId }));
  };

  return (
    <>
      <div>
        <div>{nickname}</div>
        <div>{date}</div>
        {deleted ? <div>{"삭제된 댓글입니다"}</div> : <div>{comment}</div>}
        {userInfo.nickname === nickname ? (
          <div>
            {editBtn ? <button onClick={showEditInput}>수정</button> : null}
            {delBtn ? <button onClick={delComment}>삭제</button> : null}
            {editCancelBtn ? (
              <button onClick={showEditInput}>수정취소</button>
            ) : null}
          </div>
        ) : null}
        {editInput ? (
          <div>
            <TextArea onChange={changeEditChild}>{comment}</TextArea>
            <button onClick={editChildComment}>수정완료</button>
          </div>
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

const TextArea = styled.textarea`
  width: 80%;
  height: 50px;
  resize: none;
`;

export default ChildComment;
