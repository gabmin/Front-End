import React from "react";
import styled from "styled-components";

const CommentInput = props => {
  return (
    <>
      <div>
        <TextArea></TextArea>
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
