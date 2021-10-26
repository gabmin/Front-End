import React from "react";
import styled from "styled-components";

const MultiCard = props => {
  return (
    <Card>
      <h1>title</h1>
      <p>description</p>
      <hr></hr>
      <p>user</p>
      <p>date</p>
      <p>editedDate</p>
      <p>completed</p>
      <p>likeCnt</p>
      <p>commentCnt</p>
    </Card>
  );
};

const Card = styled.div`
  width: 70%;
  height: 100%;
  padding: 20px;
  margin: 10px 10px 10px 10px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.3);
`;

export default MultiCard;
