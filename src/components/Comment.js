import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";

import ChildList from "./ChildList";
import ChildCommentInput from "../elements/ChildCommentInput";
import { DelCommentDB } from "../redux/actions/comment";
import { AddChildDB } from "../redux/actions/childComment";

const Comment = props => {
  const { nickname, commentDate, commentLikeCnt, parentComment, id, deleted } =
    props;
  const dataList = useSelector(state => state.multiDetail.multiDetail);
  // const dataList = props.dataList;
  const multiId = props.multiId;
  const render = props.render;
  const renderState = props.renderState;
  const userInfo = useSelector(state => state.user.userInfo);

  const dispatch = useDispatch();
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

  // const reRender = () => {
  //   if (renderState !== true) {
  //     render(true);
  //   }
  //   return render(false);
  // };
  const date = moment().format("YYYY-MM-DD HH:mm:ss");

  const delComment = () => {
    dispatch(DelCommentDB({ id, multiId }));
  };

  const [comment, setcomment] = useState();
  const changeComment = e => {
    setcomment(e.target.value);
  };
  const data = { comment, date };

  const addChildComment = () => {
    dispatch(AddChildDB({ multiId, id, data }));
    setHiddenInput(false);
  };

  return (
    <>
      <TempWarpper>
        <div>{nickname}</div>
        <div>{commentDate}</div>
        <div>좋아요 {commentLikeCnt}</div>
        {deleted ? (
          <div>{"삭제된 댓글입니다"}</div>
        ) : (
          <div>{parentComment}</div>
        )}
        {userInfo.nickname === nickname ? (
          <button onClick={delComment}>삭제</button>
        ) : null}

        {hiddenBtn ? (
          <button onClick={showInput}>댓글작성</button>
        ) : (
          <button onClick={showBtn}>취소</button>
        )}

        {hiddenInput ? (
          // <ChildCommentInput parentComment={id} multiId={multiId} />
          <div>
            <TextArea onChange={changeComment}></TextArea>
            <button onClick={addChildComment}>작성완료</button>
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
