import React, { useState } from "react";
import styled from "styled-components";

const CommentInput = props => {
  const [comment, setComment] = useState();
  const changeComment = e => {
    setComment(e.target.value);
  };

  return (
    <>
      <div>
        <TextArea onChange={changeComment}></TextArea>
        <button>작성완료</button>
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
