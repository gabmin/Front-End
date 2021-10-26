import React from "react";
import styled from "styled-components";
import { Line } from "rc-progress";

const EitherCard = props => {
  const {
    eitherId,
    user,
    title,
    contentA,
    contentB,
    date,
    edited,
    editedDate,
    likeCnt,
    voteCntA,
    voteCntB,
  } = props;
  return (
    <>
      <Container>
        <EitherText>
          <b>OX</b>
          <h2>{title}</h2>
        </EitherText>
        <div>
          <EitherButton>
            <h1>O</h1>
            <h5>{contentA}</h5>
          </EitherButton>
          <EitherButton>
            <h1>X</h1>
            <h5>{contentB}</h5>
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
          <div style={{ fontSize: "10px", padding: "0px 2em" }}>
            {user} {"|"} {date}
          </div>

          <div style={{ fontSize: "10px", padding: "0px 2em" }}>
            좋아요 {likeCnt}
          </div>
        </EitherFooter>
      </Container>
    </>
  );
};

const Container = styled.div`
  text-align: center;
  width: 70%;
  height: auto;
  margin: 100px auto;
  border: 1px solid black;
  border-radius: 10px;
  padding: 1em;
  opacity: 0.3;
`;

const EitherText = styled.div`
  width: 100%;
`;

const EitherProgress = styled.div`
  margin: 30px;
`;
const EitherButton = styled.button`
  width: 40%;
  height: 40%;
  &:hover {
    background-color: green;
  }
`;
const EitherFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default EitherCard;
