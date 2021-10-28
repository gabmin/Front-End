import React, { useState } from "react";
import styled from "styled-components";

const PollMaker = props => {
  const [hiddenBtnB, setHiddenBtnB] = useState(true);
  const [hiddenBtnC, setHiddenBtnC] = useState(true);
  const [hiddenBtnD, setHiddenBtnD] = useState(true);
  // const [hiddenBtnE, setHiddenBtnE] = useState(true);
  const [hiddenInputC, setHiddenInputC] = useState(false);
  const [hiddenInputD, setHiddenInputD] = useState(false);
  const [hiddenInputE, setHiddenInputE] = useState(false);
  const [contentA, setContentA] = useState("");
  const [contentB, setContentB] = useState("");
  const [contentC, setContentC] = useState("");
  const [contentD, setContentD] = useState("");
  const [contentE, setContentE] = useState("");

  // const showInputC = () => {
  //   if (hiddenInputC === false) {
  //     setHiddenInputC(true);
  //     showBtnB();
  //   } else {
  //     setHiddenInputC(false);
  //     showBtnB();
  //   }
  // };

  // const showInputD = () => {
  //   if (hiddenInputD === false) {
  //     setHiddenInputD(true);
  //     showBtnC();
  //   } else {
  //     setHiddenInputD(false);
  //     showBtnC();
  //   }
  // };

  // const showBtnB = () => {
  //   if (hiddenBtnB === false) {
  //     setHiddenBtnB(true);
  //   } else {
  //     setHiddenBtnB(false);
  //   }
  // };

  // const showBtnC = () => {
  //   if (hiddenBtnC === false) {
  //     setHiddenBtnC(true);
  //   } else {
  //     setHiddenBtnC(false);
  //   }
  // };

  const showInputC = () => {
    setHiddenInputC(true);
    hideBtnB();
  };

  const hideInputC = () => {
    setHiddenInputC(false);
    showBtnB();
  };

  const showInputD = () => {
    setHiddenInputD(true);
    hideBtnC();
  };

  const hideInputD = () => {
    setHiddenInputD(false);
    showBtnC();
  };

  const showInputE = () => {
    setHiddenInputE(true);
    hideBtnD();
  };

  const hideInputE = () => {
    setHiddenInputE(false);
    showBtnD();
  };

  const showBtnB = () => {
    setHiddenBtnB(true);
  };

  const hideBtnB = () => {
    setHiddenBtnB(false);
  };

  const showBtnC = () => {
    setHiddenBtnC(true);
  };

  const hideBtnC = () => {
    setHiddenBtnC(false);
  };

  const showBtnD = () => {
    setHiddenBtnD(true);
  };

  const hideBtnD = () => {
    setHiddenBtnD(false);
  };

  const changeContentA = e => {
    setContentA(e.target.value);
  };

  const changeContentB = e => {
    setContentB(e.target.value);
  };

  const changeContentC = e => {
    setContentC(e.target.value);
  };

  const changeContentD = e => {
    setContentD(e.target.value);
  };

  const changeContentE = e => {
    setContentE(e.target.value);
  };

  return (
    <React.Fragment>
      <InputDiv>
        <Input onChange={changeContentA} value={contentA} />
      </InputDiv>
      <InputDiv>
        <Input onChange={changeContentB} value={contentB} />
        {hiddenBtnB ? <FullBtn onClick={showInputC}>+ </FullBtn> : null}
      </InputDiv>
      {hiddenInputC ? (
        <InputDiv>
          <Input onChange={changeContentC} value={contentC} />
          <BtnDiv>
            {hiddenBtnC ? <HalfBtn onClick={hideInputC}>-</HalfBtn> : null}
            {hiddenBtnC ? <HalfBtn onClick={showInputD}>+ </HalfBtn> : null}
          </BtnDiv>
        </InputDiv>
      ) : null}
      {hiddenInputD ? (
        <InputDiv>
          <Input onChange={changeContentD} value={contentD} />
          <BtnDiv>
            {hiddenBtnD ? <HalfBtn onClick={hideInputD}>-</HalfBtn> : null}
            {hiddenBtnD ? <HalfBtn onClick={showInputE}>+ </HalfBtn> : null}
          </BtnDiv>
        </InputDiv>
      ) : null}
      {hiddenInputE ? (
        <InputDiv>
          <Input onChange={changeContentE} value={contentE} />
          <FullBtn onClick={hideInputE}>-</FullBtn>
        </InputDiv>
      ) : null}
    </React.Fragment>
  );
};

const InputDiv = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  margin: 5px auto;
  padding: 10px;
  background-color: #999999;
  box-sizing: border-box;
`;

const BtnDiv = styled.div`
  width: 100%;
  margin: auto;
`;

const FullBtn = styled.button`
  width: 100%;
  padding: 10px;
  margin: auto;
`;

const HalfBtn = styled.button`
  width: 50%;
  padding: 10px;
`;

export default PollMaker;
