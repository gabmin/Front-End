import React, { useRef, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch } from "react-redux";
import { AddCommentDB } from "../redux/actions/comment";

const CommentInput = props => {
  const dispatch = useDispatch();
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const multiId = props.multiId;
  const [comment, setComment] = useState("");
  const inputRef = useRef();

  const changeComment = e => {
    setComment(e.target.value);
    console.log(e.target.value);
  };

  const addComment = () => {
    if (comment == "") {
      window.alert("댓글 내용을 입력해주세요");
    } else {
      dispatch(AddCommentDB({ multiId, data: { comment, date } }));
      inputReset();
    }
    console.log("comment", comment);
  };

  const inputReset = () => {
    inputRef.current.value = "";
  };

  return (
    <>
      <div>
        <TextArea ref={inputRef} onChange={changeComment}></TextArea>
        <button onClick={addComment}>작성완료</button>
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
