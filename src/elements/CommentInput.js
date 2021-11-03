import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch } from "react-redux";
import { AddCommentDB } from "../redux/actions/comment";

const CommentInput = props => {
  const dispatch = useDispatch();
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const multiId = props.multiId;
  const render = props.render;
  const [comment, setComment] = useState();

  const changeComment = e => {
    setComment(e.target.value);
  };
  const data = { comment, date };

  // const reRender = () => {
  //   render("newComment");
  // };

  const addComment = () => {
    dispatch(AddCommentDB({ multiId, data }));
    // reRender();
  };

  return (
    <>
      <div>
        <TextArea onChange={changeComment}></TextArea>
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
