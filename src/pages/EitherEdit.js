import React, { useCallback } from "react";
import styled from "styled-components";
import { useState } from "react";

import EitherWrite from "../components/EitherWrite";

import { history } from "../redux/configureStore";

const EitherEdit = props => {
  const [eitherState, setEitherState] = useState(true);
  const [multiState, setMultiState] = useState(false);

  const onClickBack = useCallback(() => {
    history.push("/either");
  });
  const onClickIndex = useCallback(() => {
    history.push("/");
  });

  //radio button
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

  const eitherId = props.match.params.either_id;

  return (
    <>
      <div>2지선다 수정페이지 글 아이디 : {eitherId}</div>;
      <Wrap>
        <ButtonGrid>
          <button onClick={onClickBack}>{"<"} 뒤로가기</button>
          <button onClick={onClickIndex}>목록</button>
        </ButtonGrid>
        <ContentBox>
          <Index>
            <h4 style={{ width: "30px" }}>구분</h4>
            <div style={{ display: "flex" }}>
              <RadioButton>
                <input
                  type="radio"
                  id="either"
                  checked={eitherState}
                  onChange={EitherRadioBtn}
                />
                <label htmlFor="either">찬반</label>
              </RadioButton>
              <RadioButton>
                <input
                  type="radio"
                  id="multi"
                  checked={multiState}
                  onChange={MultiRadioBtn}
                />
                <label htmlFor="multi">객관식</label>
              </RadioButton>
            </div>
          </Index>
          <EitherWrite />
          {/* <MultiWrite /> */}
        </ContentBox>

        <div>
          <button>취소</button>
          <button>완료</button>
        </div>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 80%;
  height: 100%;
  margin: 50px auto;
`;
const ButtonGrid = styled.div`
  width: 100%;
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
`;

const ContentBox = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  padding: 1em;
  box-sizing: border-box;
`;
const RadioButton = styled.div`
  width: 70px;
  display: flex;
  margin: 0px 0px 0px 60px;
  align-items: center;
`;

const Index = styled.div`
  margin: 10px;
  display: flex;
`;
export default EitherEdit;
