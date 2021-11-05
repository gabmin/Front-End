import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch } from "react-redux";
import { AddCommentDB } from "../redux/actions/comment";

const CommentInput = props => {
  const dispatch = useDispatch();
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const multiId = props.multiId;
  const [comment, setComment] = useState("");

  const changeComment = e => {
    setComment(e.target.value);
  };

  const addComment = () => {
    if (comment == "") {
      window.alert("댓글 내용을 입력해주세요");
    } else {
      dispatch(AddCommentDB({ multiId, data: { comment, date } }));
      setComment("");
    }
    console.log("comment", comment);
  };

  const reset = () => {
    setComment("");
  };

  return (
    <>
      <div>
        <TextArea onChange={changeComment}></TextArea>
        <button onClick={addComment}>작성완료</button>
        <button onClick={reset}>reset</button>
      </div>
    </>
  );
};

const TextArea = styled.textarea`
  width: 80%;
  height: 50px;
  resize: none;
`;

export default CommentInput;
