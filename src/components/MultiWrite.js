import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useDispatch } from "react-redux";
import { AddPostDB } from "../redux/actions/multiCard";

const MultiWrite = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hiddenBtnB, setHiddenBtnB] = useState(true);
  const [hiddenBtnC, setHiddenBtnC] = useState(true);
  const [hiddenBtnD, setHiddenBtnD] = useState(true);
  const [hiddenInputC, setHiddenInputC] = useState(false);
  const [hiddenInputD, setHiddenInputD] = useState(false);
  const [hiddenInputE, setHiddenInputE] = useState(false);
  const [contentA, setContentA] = useState("");
  const [contentB, setContentB] = useState("");
  const [contentC, setContentC] = useState("");
  const [contentD, setContentD] = useState("");
  const [contentE, setContentE] = useState("");

  const dispatch = useDispatch();
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const addPost = () => {
    if (title === "") {
      return window.alert("no title");
    } else if (description === "") {
      return window.alert("no description");
    } else if (contentA === "") {
      return window.alert("선택지를 빈칸없이 차례대로 입력해 주세요");
    } else if (contentB === "") {
      return window.alert("선택지를 빈칸없이 차례대로 입력해 주세요");
    } else if ((contentD !== "" || contentE !== "") && contentC === "") {
      return window.alert("선택지를 빈칸없이 차례대로 입력해 주세요");
    } else if ((contentC !== "" || contentE !== "") && contentD === "") {
      return window.alert("선택지를 차례대로 입력해 주세요");
    } else if (contentC === "" && contentD === "" && contentE === "") {
      dispatch(
        AddPostDB({
          title,
          description,
          date,
          contentA,
          contentB,
        }),
      );
    } else if (contentD === "" && contentE === "") {
      dispatch(
        AddPostDB({
          title,
          description,
          date,
          contentA,
          contentB,
          contentC,
        }),
      );
    } else if (contentE === "") {
      dispatch(
        AddPostDB({
          title,
          description,
          date,
          contentA,
          contentB,
          contentC,
          contentD,
        }),
      );
    } else {
      dispatch(
        AddPostDB({
          title,
          description,
          date,
          contentA,
          contentB,
          contentC,
          contentD,
          contentE,
        }),
      );
    }
  };
  console.log(
    "addPost",
    title,
    description,
    contentA,
    contentB,
    contentC,
    contentD,
    contentE,
    date,
  );

  const changeTitle = e => {
    setTitle(e.target.value);
  };

  const changeDescription = e => {
    setDescription(e.target.value);
  };

  const showInputC = () => {
    setHiddenInputC(true);
    hideBtnB();
  };

  const hideInputC = () => {
    setHiddenInputC(false);
    showBtnB();
    setContentC("");
  };

  const showInputD = () => {
    setHiddenInputD(true);
    hideBtnC();
  };

  const hideInputD = () => {
    setHiddenInputD(false);
    showBtnC();
    setContentD("");
  };

  const showInputE = () => {
    setHiddenInputE(true);
    hideBtnD();
  };

  const hideInputE = () => {
    setHiddenInputE(false);
    showBtnD();
    setContentE("");
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
    <>
      <hr />
      <Title>
        <h4 style={{ width: "30px" }}>제목</h4>
        <Input
          type="text"
          placeholder="질문을 입력해주세요."
          onChange={changeTitle}
          value={title}
        />
      </Title>
      <hr />
      <Content>
        <h4 style={{ width: "30px" }}>내용</h4>
        <Textarea
          type="text"
          placeholder="선택지 추가를 눌러 선택지 개수를 늘려보세요. 최대 5개까지 추가할 수 있습니다."
          rows="10"
          onChange={changeDescription}
          value={description}
        />
      </Content>
      <hr />
      <VoteBox>
        <InputDiv>
          <InputPoll onChange={changeContentA} value={contentA} />
        </InputDiv>
        <InputDiv>
          <InputPoll onChange={changeContentB} value={contentB} />
          {hiddenBtnB ? <FullBtn onClick={showInputC}>+ </FullBtn> : null}
        </InputDiv>
        {hiddenInputC ? (
          <InputDiv>
            <InputPoll onChange={changeContentC} value={contentC} />
            <BtnDiv>
              {hiddenBtnC ? <HalfBtn onClick={hideInputC}>-</HalfBtn> : null}
              {hiddenBtnC ? <HalfBtn onClick={showInputD}>+ </HalfBtn> : null}
            </BtnDiv>
          </InputDiv>
        ) : null}
        {hiddenInputD ? (
          <InputDiv>
            <InputPoll onChange={changeContentD} value={contentD} />
            <BtnDiv>
              {hiddenBtnD ? <HalfBtn onClick={hideInputD}>-</HalfBtn> : null}
              {hiddenBtnD ? <HalfBtn onClick={showInputE}>+ </HalfBtn> : null}
            </BtnDiv>
          </InputDiv>
        ) : null}
        {hiddenInputE ? (
          <InputDiv>
            <InputPoll onChange={changeContentE} value={contentE} />
            <FullBtn onClick={hideInputE}>-</FullBtn>
          </InputDiv>
        ) : null}
        <div>
          <button>취소</button>
          <button onClick={addPost}>완료</button>
        </div>
      </VoteBox>
    </>
  );
};

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
  resize: none;
`;

const VoteBox = styled.div`
  width: 100%;
  height: 500px;
`;

const InputDiv = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const InputPoll = styled.input`
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

export default MultiWrite;
