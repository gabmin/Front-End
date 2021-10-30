import React, { useCallback, useState } from "react";
import styled from "styled-components";

import EitherWrite from "../components/EitherWrite";
import MultiWrite from "../components/MultiWrite";
import { history } from "../redux/configureStore";

const CardWrite = () => {
  const [eitherState, setEitherState] = useState(true);
  const [multiState, setMultiState] = useState(false);
  const [status, setStatus] = useState(true);

  //뒤로가기
  const onClickBack = useCallback(() => {
    history.push("/either");
  });
  //목록으로가기
  const onClickIndex = useCallback(() => {
    history.push("/");
  });

  // radio button
  const EitherRadioBtn = e => {
    if (e.target.value === "on") {
      setStatus(true);
      return;
    } else {
      setEitherState(!eitherState);
      setMultiState(!multiState);
    }
  };
  const MultiRadioBtn = e => {
    if (e.target.value === "on") {
      return;
    } else {
      setEitherState(!eitherState);
      setMultiState(!multiState);
    }
  };

  console.log("status", status);

  // const EitherRadioBtn = e => {
  //   if (e.target.value === "on") {
  //     setStatus(true);
  //   }
  // };

  // const MultiRadioBtn = e => {
  //   console.log(e.target.value);
  // };
  return (
    <>
      <Wrap>
        <ButtonGrid>
          <button onClick={onClickBack}>{"<"} 뒤로가기</button>
          <button onClick={onClickIndex}>목록</button>
        </ButtonGrid>
        <ContentBox>
          <Index>
            <h4 style={{ width: "30px" }}>구분</h4>
            <div style={{ display: "flex" }}>
              <RadioBtnWarpper>
                <input
                  name="write"
                  type="radio"
                  // id="either"
                  checked
                  onChange={EitherRadioBtn}
                />
                <label>찬반</label>
              </RadioBtnWarpper>
              <RadioBtnWarpper>
                <input
                  name="write"
                  type="radio"
                  // id="multi"
                  // checked={multiState}
                  // onChange={MultiRadioBtn}
                />
                <label>객관식</label>
              </RadioBtnWarpper>
            </div>
          </Index>
          <EitherWrite />
          <MultiWrite />
        </ContentBox>
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
const RadioBtnWarpper = styled.div`
  width: 70px;
  display: flex;
  margin: 0px 0px 0px 60px;
  align-items: center;
`;

const Index = styled.div`
  margin: 10px;
  display: flex;
`;
export default CardWrite;
