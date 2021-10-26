import React from "react";
import styled from "styled-components";
import { useState } from "react";

const EitherWrite = () => {
  const [eitherState, setEitherState] = useState(true);
  const [multiState, setMultiState] = useState(false);

  const EitherRadioBtn = () => {
    if (eitherState === true) {
      return;
    } else {
      setEitherState(!eitherState);
      setMultiState(!multiState);
    }
  };
  const MultiRadioBtn = () => {
    if (multiState === true) {
      return;
    } else {
      setEitherState(!eitherState);
      setMultiState(!multiState);
    }
  };
  return (
    <>
      <ContentBox>
        <Index>
          <h4 style={{ width: "30px" }}>구분</h4>
          <div style={{ display: "flex" }}>
            <RadioButton>
              <input
                type="radio"
                id="either"
                checked={eitherState}
                onClick={EitherRadioBtn}
              />
              <label htmlFor="either">찬반</label>
            </RadioButton>
            <RadioButton>
              <input
                type="radio"
                id="multi"
                checked={multiState}
                onClick={MultiRadioBtn}
              />
              <label htmlFor="multi">객관식</label>
            </RadioButton>
          </div>
        </Index>
        <hr />
        <Title>
          <h4 style={{ width: "30px" }}>제목</h4>
          <Input type="text" placeholder="질문을 입력해주세요." />
        </Title>
        <hr />
        <VoteBox></VoteBox>
      </ContentBox>
    </>
  );
};

const RadioButton = styled.div`
  width: 70px;
  display: flex;
  margin: 0px 0px 0px 60px;
  align-items: center;
`;

const ContentBox = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  padding: 1em;
  box-sizing: border-box;
`;

const Index = styled.div`
  margin: 10px;
  display: flex;
`;

const Title = styled.div`
  margin: 10px;
  display: flex;
`;

const Input = styled.input`
  width: 100%;
  margin: 15px 0px 15px 30px;
  border: none;
  outline: none;
  font-size: 18px;
`;

const VoteBox = styled.div`
  width: 100%;
  height: 500px;
`;
export default EitherWrite;
