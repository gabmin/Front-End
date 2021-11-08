import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import { FiThumbsUp } from "react-icons/fi";

import colors from "../shared/colors";
import ChildList from "./ChildList";
import ChildCommentInput from "../elements/ChildCommentInput";
import { EditCommentDB, DelCommentDB } from "../redux/actions/comment";
import { AddChildDB } from "../redux/actions/childComment";
import { AddLikeComment } from "../redux/actions/multiLike";
import CommentNick from "../elements/CommentNick";
import CommentContent from "../elements/CommentContent";
import CommentDate from "../elements/CommentDate";

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

  return (
    <>
      <TempWarpper>
        <InfoWarpper>
          <NickWarpper>
            <CommentNick>{nickname}</CommentNick>
            <CommentDate>{commentDate}</CommentDate>
          </NickWarpper>
          <BtnWrapper>
            {userInfo.nickname === nickname && !deleted && editBtn ? (
              <EventBtn onClick={showEditInput}>수정</EventBtn>
            ) : null}
            {userInfo.nickname === nickname && !deleted && delBtn ? (
              <EventBtn onClick={delComment}>삭제</EventBtn>
            ) : null}
            {addBtn ? <EventBtn onClick={showInput}>답글 달기</EventBtn> : null}
          </BtnWrapper>
        </InfoWarpper>
        <ContentWrapper>
          {deleted ? (
            <CommentContent>{"삭제된 댓글입니다"}</CommentContent>
          ) : (
            <CommentContent>{comment}</CommentContent>
          )}
          <LikeWrapper>
            <LikeBtn onClick={addLike}>
              <FiThumbsUp />
            </LikeBtn>
            <TotalLikes>{likes}</TotalLikes>
          </LikeWrapper>
        </ContentWrapper>

        {addInput ? (
          <ReplyWarpper>
            <TextArea onChange={changeComment}></TextArea>
            {cancelBtn ? <EventBtn onClick={showInput}>취소</EventBtn> : null}
            <EventBtn onClick={addChildComment}>작성완료</EventBtn>
          </ReplyWarpper>
        ) : null}
        {editInput ? (
          <div>
            <TextArea onChange={changeEditComment}>{comment}</TextArea>
            {userInfo.nickname === nickname && !deleted ? (
              <div>
                {editCancelBtn ? (
                  <EventBtn onClick={showEditInput}>수정취소</EventBtn>
                ) : null}
              </div>
            ) : null}
            <EventBtn onClick={editComment}>수정완료</EventBtn>
          </div>
        ) : null}
        <div>
          <ChildList parentComment={id} multiId={multiId} dataList={dataList} />
        </div>
        <CommentHr />
      </TempWarpper>
    </>
  );
};

const TempWarpper = styled.div`
  background-color: ${colors.white};
`;

const InfoWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NickWarpper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BtnWrapper = styled.div``;

const EventBtn = styled.button`
  font-size: 10px;
  text-decoration: underline;
  border: none;
  color: ${colors.red};
  background-color: ${colors.white};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LikeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LikeBtn = styled.button`
  border: none;
  color: ${colors.gray5};
  background-color: ${colors.white};
`;

const TotalLikes = styled.p`
  font-size: 10px;
  color: ${colors.darkGray};
`;

const ReplyWarpper = styled.div`
  width: 80%;
  height: 80px;
  margin: 0 0 0 auto;
  border: 1px ${colors.gray5} solid;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  background-color: ${colors.gray};
`;

const TextArea = styled.textarea`
  width: 80%;
  height: 50px;
  margin: auto;
  border: none;
  resize: none;
  background-color: ${colors.gray};
  &:focus {
    outline: none;
  }
`;

const CommentHr = styled.hr`
  width: 556px;
  height: 2px;
  border: none;
  background-color: ${colors.gray};
`;

export default Comment;
