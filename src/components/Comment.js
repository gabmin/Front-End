import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";

import ChildList from "./ChildList";
import ChildCommentInput from "../elements/ChildCommentInput";
import { EditCommentDB, DelCommentDB } from "../redux/actions/comment";
import { AddChildDB } from "../redux/actions/childComment";
import { AddLikeComment } from "../redux/actions/multiLike";

const Comment = props => {
  const { nickname, commentDate, commentLikeCnt, id, deleted, comment, liked } =
    props;
  const dataList = useSelector(state => state.multiDetail.multiDetail);
  // const dataList = props.dataList;
  const multiId = props.multiId;
  const render = props.render;
  const renderState = props.renderState;
  const userInfo = useSelector(state => state.user.userInfo);

  const dispatch = useDispatch();
  const [addInput, setAddInput] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [addBtn, setAddBtn] = useState(true);
  const [cancelBtn, setCancelBtn] = useState(false);
  const [editBtn, setEditBtn] = useState(true);
  const [editCancelBtn, setEditCancelBtn] = useState(false);
  const [delBtn, setDelBtn] = useState(true);
  const [likes, setLikes] = useState(commentLikeCnt);

  const showInput = () => {
    if (addInput === false) {
      setAddInput(true);
      setAddBtn(false);
      setCancelBtn(true);
      setEditBtn(false);
      setDelBtn(false);
    } else {
      setAddInput(false);
      setAddBtn(true);
      setCancelBtn(false);
      setEditBtn(true);
      setDelBtn(true);
    }
  };

  const showEditInput = () => {
    if (editInput === false) {
      setEditInput(true);
      setAddBtn(false);
      setEditCancelBtn(true);
      setEditBtn(false);
      setDelBtn(false);
    } else {
      setEditInput(false);
      setAddBtn(true);
      setEditCancelBtn(false);
      setEditBtn(true);
      setDelBtn(true);
    }
  };

  // const reRender = () => {
  //   if (renderState !== true) {
  //     render(true);
  //   }
  //   return render(false);
  // };
  //대댓글 작성
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const [newComment, setNewComment] = useState();
  const changeComment = e => {
    setNewComment(e.target.value);
  };
  console.log("commentCheck", multiId, id);
  const addChildComment = () => {
    dispatch(AddChildDB({ multiId, id, data: { comment: newComment, date } }));
    setAddInput(false);
    setAddBtn(true);
  };

  //댓글 수정
  const editedDate = moment().format("YYYY-MM-DD HH:mm:ss");
  const [newEdit, setNewEdit] = useState();
  const changeEditComment = e => {
    setNewEdit(e.target.value);
    console.log("newEdit", newEdit);
  };

  const editComment = () => {
    dispatch(
      EditCommentDB({ multiId, id, data: { comment: newEdit, editedDate } }),
    );
    showEditInput();
    console.log("checkcheck", multiId, id);
  };

  //댓글 삭제
  const delComment = () => {
    dispatch(DelCommentDB({ id, multiId }));
  };

  // 댓글 좋아요
  const addLike = () => {
    if (liked === null) {
      dispatch(AddLikeComment({ id, multiId }));
      setLikes(likes + 1);
    } else {
      return;
    }
  };
  console.log("cntcnt", commentLikeCnt);

  return (
    <>
      <TempWarpper>
        <div>{nickname}</div>
        <div>{commentDate}</div>
        <button onClick={addLike}>좋아요 </button>
        {likes}
        {deleted ? <div>{"삭제된 댓글입니다"}</div> : <div>{comment}</div>}
        {userInfo.nickname === nickname ? (
          <div>
            {editBtn ? <button onClick={showEditInput}>수정</button> : null}
            {editCancelBtn ? (
              <button onClick={showEditInput}>수정취소</button>
            ) : null}
            {delBtn ? <button onClick={delComment}>삭제</button> : null}
          </div>
        ) : null}

        {addBtn ? <button onClick={showInput}>댓글작성</button> : null}
        {cancelBtn ? <button onClick={showInput}>취소</button> : null}

        {addInput ? (
          // <ChildCommentInput parentComment={id} multiId={multiId} />
          <div>
            <TextArea onChange={changeComment}></TextArea>
            <button onClick={addChildComment}>작성완료</button>
          </div>
        ) : null}
        {editInput ? (
          // <ChildCommentInput parentComment={id} multiId={multiId} />
          <div>
            <TextArea onChange={changeEditComment}>{comment}</TextArea>
            <button onClick={editComment}>수정완료</button>
          </div>
        ) : null}
        <div>
          <ChildList parentComment={id} multiId={multiId} dataList={dataList} />
        </div>
      </TempWarpper>
    </>
  );
};

const TempWarpper = styled.div`
  background-color: white;
`;

const TextArea = styled.textarea`
  width: 80%;
  height: 50px;
  resize: none;
`;

export default Comment;
