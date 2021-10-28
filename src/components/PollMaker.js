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

  return (
    <React.Fragment>
      <InputDiv>
        <Input />
      </InputDiv>
      <InputDiv>
        <Input />
        {hiddenBtnB ? <FullBtn onClick={showInputC}>+ </FullBtn> : null}
      </InputDiv>
      {hiddenInputC ? (
        <InputDiv>
          <Input />
          <BtnDiv>
            {hiddenBtnC ? <HalfBtn onClick={hideInputC}>-</HalfBtn> : null}
            {hiddenBtnC ? <HalfBtn onClick={showInputD}>+ </HalfBtn> : null}
          </BtnDiv>
        </InputDiv>
      ) : null}
      {hiddenInputD ? (
        <InputDiv>
          <Input />
          <BtnDiv>
            {hiddenBtnD ? <HalfBtn onClick={hideInputD}>-</HalfBtn> : null}
            {hiddenBtnD ? <HalfBtn onClick={showInputE}>+ </HalfBtn> : null}
          </BtnDiv>
        </InputDiv>
      ) : null}
      {hiddenInputE ? (
        <InputDiv>
          <Input />
          <FullBtn onClick={hideInputE}>-</FullBtn>
        </InputDiv>
      ) : null}
    </React.Fragment>
  );
};

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  height: 20px;
`;

const BtnDiv = styled.div``;

const FullBtn = styled.button`
  width: 100%;
`;

const HalfBtn = styled.button`
  width: 50%;
`;

export default PollMaker;
