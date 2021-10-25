import React from "react";
import styled from "styled-components";
import { Line } from "rc-progress";

const Container = styled.div`
  text-align: center;
  width: 400px;
  margin: auto;
  border: 1px solid black;
  border-radius: 10px;
  padding: 1em;
`;

const EitherText = styled.div`
  width: 100%;
`;

const EitherProgress = styled.div`
  margin: 30px;
`;
const EitherButton = styled.button`
  &:hover {
    background-color: green;
  }
`;
const EitherFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Card = () => {
  return (
    <>
      <Container>
        <EitherText>
          <b>OX</b>
          <h1>삼전 9층인데 익절해야할까요?</h1>
        </EitherText>
        <div>
          <EitherButton>
            <h1>O</h1>
            <h3>ㅇㅇ 익절 ㄱㄱ</h3>
          </EitherButton>
          <EitherButton>
            <h1>X</h1>
            <h3>ㅇㅇ 익절 ㄱㄱ</h3>
          </EitherButton>
        </div>
        <EitherProgress>
          <Line
            percent="30"
            strokeWidth="4"
            strokeColor="green"
            trailWidth="4"
            trailColor="yellow"
            style={{ width: "300px" }}
          />
        </EitherProgress>
        <EitherFooter>
          <div>김개미 13분전</div>

          <div>좋아요 10개</div>
        </EitherFooter>
      </Container>
    </>
  );
};

export default Card;
