import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch } from "react-redux";
import { AddChildDB } from "../redux/actions/childComment";

const ChildCommentInput = props => {
  const dispatch = useDispatch();
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const multiId = props.multiId;
  const commentId = props.parentId;
  const [comment, setComment] = useState();
  const changeComment = e => {
    setComment(e.target.value);
  };
  const data = { comment, date };
  console.log(commentId);

  const addChildComment = () => {
    dispatch(AddChildDB({ multiId, commentId, data }));
  };

  return (
    <>
      <div>
        <TextArea onChange={changeComment}></TextArea>
        <button onClick={addChildComment}>작성완료</button>
      </div>
    </>
  );
};

const TextArea = styled.textarea`
  width: 80%;
  height: 50px;
  resize: none;
`;

export default ChildCommentInput;
