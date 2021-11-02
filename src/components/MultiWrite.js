import React, { useRef, useState } from "react";
import styled from "styled-components";
import moment from "moment";

import { history } from "../redux/configureStore";
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
  const titleRef = useRef();
  const descriptionRef = useRef();
  const contentARef = useRef();
  const contentBRef = useRef();
  const contentCRef = useRef();
  const contentDRef = useRef();
  const contentERef = useRef();

  const addPost = () => {
    if (title === "") {
      window.alert("no title");
      return setTimeout(() => {
        titleRef.current.focus();
      }, 500);
    } else if (description === "") {
      window.alert("no description");
      return setTimeout(() => {
        descriptionRef.current.focus();
      }, 500);
    } else if (contentA === "") {
      window.alert("선택지를 빈칸없이 차례대로 입력해 주세요");
      return setTimeout(() => {
        contentARef.current.focus();
      }, 500);
    } else if (contentB === "") {
      window.alert("선택지를 빈칸없이 차례대로 입력해 주세요");
      return setTimeout(() => {
        contentBRef.current.focus();
      }, 500);
    } else if ((contentD !== "" || contentE !== "") && contentC === "") {
      window.alert("세번째 선택지를 빈칸없이 차례대로 입력해 주세요");
      return setTimeout(() => {
        contentCRef.current.focus();
      }, 500);
    } else if (contentE !== "" && contentD === "") {
      window.alert("네번째 선택지를 빈칸없이 차례대로 입력해 주세요");
      return setTimeout(() => {
        contentDRef.current.focus();
      }, 500);
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
    history.push("/multi");
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

  const cancel = () => {
    history.push("/multi");
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
          ref={titleRef}
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
          ref={descriptionRef}
          type="text"
          placeholder="선택지 추가를 눌러 선택지 개수를 늘려보세요. 최대 5개까지 추가할 수 있습니다."
          rows="10"
          onChange={changeDescription}
          value={description}
        />
      </Content>
      <hr />
      <VoteBox>
        <InputWarpper>
          <InputPoll
            ref={contentARef}
            onChange={changeContentA}
            value={contentA}
          />
        </InputWarpper>
        <InputWarpper>
          <InputPoll
            ref={contentBRef}
            onChange={changeContentB}
            value={contentB}
          />
          {hiddenBtnB ? <FullBtn onClick={showInputC}>+ </FullBtn> : null}
        </InputWarpper>
        {hiddenInputC ? (
          <InputWarpper>
            <InputPoll
              ref={contentCRef}
              onChange={changeContentC}
              value={contentC}
            />
            <BtnWarpper>
              {hiddenBtnC ? <HalfBtn onClick={hideInputC}>-</HalfBtn> : null}
              {hiddenBtnC ? <HalfBtn onClick={showInputD}>+ </HalfBtn> : null}
            </BtnWarpper>
          </InputWarpper>
        ) : null}
        {hiddenInputD ? (
          <InputWarpper>
            <InputPoll
              ref={contentDRef}
              onChange={changeContentD}
              value={contentD}
            />
            <BtnWarpper>
              {hiddenBtnD ? <HalfBtn onClick={hideInputD}>-</HalfBtn> : null}
              {hiddenBtnD ? <HalfBtn onClick={showInputE}>+ </HalfBtn> : null}
            </BtnWarpper>
          </InputWarpper>
        ) : null}
        {hiddenInputE ? (
          <InputWarpper>
            <InputPoll
              ref={contentERef}
              onChange={changeContentE}
              value={contentE}
            />
            <FullBtn onClick={hideInputE}>-</FullBtn>
          </InputWarpper>
        ) : null}
        <div>
          <button onClick={cancel}>취소</button>
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

const InputWarpper = styled.div`
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

const BtnWarpper = styled.div`
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
