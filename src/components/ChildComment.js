import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";

import colors from "../shared/colors";
import ChildCommentInput from "../elements/ChildCommentInput";
import {
  AddChildDB,
  DelChildDB,
  EditChildDB,
} from "../redux/actions/childComment";
import { AddLikeChild } from "../redux/actions/multiLike";
import CommentNick from "../elements/CommentNick";
import CommentContent from "../elements/CommentContent";
import CommentDate from "../elements/CommentDate";

const ChildComment = props => {
  const {
    nickname,
    date,
    id,
    parentComment,
    comment,
    deleted,
    commentLikeCnt,
    liked,
  } = props;

  const dispatch = useDispatch();
  const multiId = props.multiId;
  const userInfo = useSelector(state => state.user.userInfo);
  // const childComments = useSelector(state => state.childComment.ChildCommentDB);
  const [addInput, setAddInput] = useState(false);
  const [addBtn, setAddBtn] = useState(true);
  const [cancelBtn, setCancelBtn] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [editBtn, setEditBtn] = useState(true);
  const [editCancelBtn, setEditCancelBtn] = useState(false);
  const [delBtn, setDelBtn] = useState(true);
  const [likes, setLikes] = useState(commentLikeCnt);

  console.log("childComment", comment);

  const showInput = () => {
    if (addInput === false) {
      setAddInput(true);
      setAddBtn(false);
      setCancelBtn(true);
      setEditBtn(false);
      setDelBtn(false);
      console.log("comp", multiId, parentComment, id);
    } else {
      setAddInput(false);
      setAddBtn(true);
      setCancelBtn(false);
      setEditBtn(true);
      setDelBtn(true);
    }
  };

  const newDate = moment().format("YYYY-MM-DD HH:mm:ss");
  const [newComment, setNewComment] = useState();
  const changeChild = e => {
    setNewComment(e.target.value);
  };

  const addChildComment = () => {
    dispatch(
      AddChildDB({
        multiId,
        id: parentComment,
        data: { comment: newComment, date: newDate },
      }),
    );
    showInput();
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

  const addLike = () => {
    if (liked === null) {
      dispatch(AddLikeChild({ id, multiId }));
      setLikes(likes + 1);
    } else {
      return;
    }
  };

  return (
    <>
      <div>
        <NickWarpper>
          <CommentNick>{nickname}</CommentNick>
          <CommentDate>{date}</CommentDate>
        </NickWarpper>
        {addBtn ? <EventBtn onClick={showInput}>답글 달기</EventBtn> : null}
        <button onClick={addLike}>좋아요</button>
        {likes}

        {deleted ? (
          <CommentContent>{"삭제된 댓글입니다"}</CommentContent>
        ) : (
          <CommentContent>{comment}</CommentContent>
        )}
        {userInfo.nickname === nickname && !deleted ? (
          <div>
            {editBtn ? <EventBtn onClick={showEditInput}>수정</EventBtn> : null}
            {delBtn ? <EventBtn onClick={delComment}>삭제</EventBtn> : null}
            {editCancelBtn ? (
              <EventBtn onClick={showEditInput}>수정취소</EventBtn>
            ) : null}
          </div>
        ) : null}
        {editInput ? (
          <div>
            <TextArea onChange={changeEditChild}>{comment}</TextArea>
            <EventBtn onClick={editChildComment}>수정완료</EventBtn>
          </div>
        ) : null}

        {cancelBtn ? <EventBtn onClick={showInput}>취소</EventBtn> : null}

        {addInput ? (
          <div>
            <TextArea onChange={changeChild}></TextArea>
            <EventBtn onClick={addChildComment}>완료</EventBtn>
          </div>
        ) : null}
      </div>
    </>
  );
};

const NickWarpper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const EventBtn = styled.button`
  font-size: 10px;
  text-decoration: underline;
  border: none;
  color: ${colors.red};
  background-color: ${colors.white};
`;

const TextArea = styled.textarea`
  width: 80%;
  height: 50px;
  resize: none;
`;

export default ChildComment;
