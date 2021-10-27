import React from "react";
import styled from "styled-components";

const CommentInput = props => {
  return (
    <React.Fragment>
      <div>
        <TextArea></TextArea>
        <button>작성완료</button>
      </div>
    </React.Fragment>
  );
};

const TextArea = styled.textarea`
  width: 80%;
  height: 50px;
  resize: none;
`;

export default CommentInput;
