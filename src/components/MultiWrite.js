import React from "react";
import styled from "styled-components";
import { useState } from "react";

const MultiWrite = () => {
  const [eitherState, setEitherState] = useState(false);
  const [multiState, setMultiState] = useState(true);

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
        <Content>
          <h4 style={{ width: "30px" }}>내용</h4>
          <Textarea
            type="text"
            placeholder="선택지 추가를 눌러 선택지 개수를 늘려보세요. 최대 5개까지 추가할 수 있습니다."
            rows="5"
          />
        </Content>
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

const Content = styled.div`
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

const Textarea = styled.textarea`
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
export default MultiWrite;
