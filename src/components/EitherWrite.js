import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";

import { history } from "../redux/configureStore";
import { addPostDB } from "../redux/actions/eitherCard";

const EitherWrite = props => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [contentA, setContentA] = useState("");
  const [contentB, setContentB] = useState("");
  const [action, setAction] = useState(null);

  const { addPostDBDone, addPostDBError } = useSelector(
    state => state.eitherCard,
  );
  useEffect(() => {
    if (action) {
      if (addPostDBDone) {
        alert("작성이 완료되었습니다!");
        window.location.replace("/either");
      }
      if (addPostDBError) {
        alert("투표 작성에 문제가 발생하였습니다!");
      }
      setAction(null);
    }
  }, [addPostDBDone, addPostDBError]);

  //Title 데이터
  const onChangeTitle = e => {
    setTitle(e.target.value);
  };
  //contentA 데이터
  const onChangeContentA = e => {
    setContentA(e.target.value);
  };
  //contentB 데이터
  const onChangeContentB = e => {
    setContentB(e.target.value);
  };
  // date
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  //저장하기
  const onClickSave = () => {
    if (title === "" || contentA === "" || contentB === "") {
      alert("모든 항목을 입력해주세요!");
    } else {
      dispatch(addPostDB({ title, contentA, contentB, date }));
      setAction(true);
    }
  };
  //취소하기
  const onClickCancle = () => {
    history.goBack();
  };
  return (
    <>
      <hr />
      <Title>
        <h4 style={{ width: "30px" }}>제목</h4>
        <Input
          type="text"
          placeholder="질문을 입력해주세요."
          value={title}
          onChange={onChangeTitle}
        />
      </Title>
      <hr />
      <VoteBox>
        <EitherButtonGrid>
          <EitherButton>
            <h1 style={{ marginTop: "70px" }}>O</h1>
            <ButtonInput
              placeholder="해당 항목의 상세설명이 필요하면 적어주세요"
              value={contentA}
              onChange={onChangeContentA}
            />
          </EitherButton>
          <EitherButton>
            <h1 style={{ marginTop: "70px" }}>X</h1>
            <ButtonInput
              placeholder="해당 항목의 상세설명이 필요하면 적어주세요"
              value={contentB}
              onChange={onChangeContentB}
            />
          </EitherButton>
        </EitherButtonGrid>
        <div>
          <button onClick={onClickCancle}>취소</button>
          <button onClick={onClickSave}>완료</button>
        </div>
      </VoteBox>
    </>
  );
};

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
  height: 400px;
`;

const EitherButtonGrid = styled.div`
  width: 100%;
  height: 90%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EitherButton = styled.div`
  width: 40%;
  height: 60%;
  border: 1px solid black;
  text-align: center;
  align-content: center;
  z-index: 10;
`;

const ButtonInput = styled.input`
  border: none;
  outline: none;
  width: 80%;
  font-size: 16px;
  text-align: center;
`;

export default EitherWrite;
