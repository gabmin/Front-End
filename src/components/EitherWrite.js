import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";

import { mobile, tablet } from "../shared/style";
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
    setTitle(e.target.value.substr(0, 30));
  };
  //contentA 데이터
  const onChangeContentA = e => {
    setContentA(e.target.value.substr(0, 30));
  };
  //contentB 데이터
  const onChangeContentB = e => {
    setContentB(e.target.value.substr(0, 30));
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
    <Container>
      <hr />
      <Title>
        <p>제목</p>
        <Input
          type="text"
          placeholder="질문을 입력해주세요. (30자 이내)"
          value={title}
          onChange={onChangeTitle}
          data-testid="titleInput"
        />
      </Title>
      <hr />
      <EitherButtonGrid>
        <EitherButtonA>
          <ButtonInput
            type="text"
            placeholder="박스를 클릭해서 항목에 대한 상세 설명을 입력해보세요. (30자 이내)"
            value={contentA}
            onChange={onChangeContentA}
            data-testid="contentA"
          />
        </EitherButtonA>
        <EitherButtonB>
          <ButtonInput
            type="text"
            placeholder="박스를 클릭해서 항목에 대한 상세 설명을 입력해보세요. (30자 이내)"
            value={contentB}
            onChange={onChangeContentB}
            data-testid="contentB"
          />
        </EitherButtonB>
      </EitherButtonGrid>
      <hr />
      <OptionButtonGrid>
        <CancleButton onClick={onClickCancle}>취소</CancleButton>
        <CheckButton onClick={onClickSave}>완료</CheckButton>
      </OptionButtonGrid>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  hr {
    margin: 0px;
    border: none;
    height: 1px;
    background-color: #eeeeee;
  }
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 72px;
  p {
    width: 68px;
    font-size: 18px;
    font-weight: bold;
    /* line-height: 26px; */
    /* margin: 22px 76px 28px 0px; */
    @media screen and (max-width: ${mobile}) {
      font-size: 16px;
      /* margin: 20px 35px 20px 0px; */
    }
  }
`;
const Input = styled.input`
  width: 80%;
  border: none;
  outline: none;
  line-height: 22px;
  font-size: 18px;
  color: #101214;
  &::placeholder {
    font-size: 16px;
    color: #868e96;
  }

  @media screen and (max-width: ${mobile}) {
    font-size: 14px;
  }
`;
const EitherButtonGrid = styled.div`
  width: 100%;
  height: 320px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EitherButtonA = styled.div`
  width: 310.5px;
  height: 232px;
  border: 1px solid #868e96;
  margin: 24px 0px 24px 0px;
  border-radius: 10px 0px 0px 10px;
  padding: 24px 24px 0px 24px;
`;
const EitherButtonB = styled.div`
  width: 310.5px;
  height: 232px;
  border: 1px solid #868e96;
  margin: 24px 0px 24px 0px;
  border-radius: 0px 10px 10px 0px;
  padding: 24px 24px 0px 24px;
`;
const ButtonInput = styled.textarea`
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  font-size: 16px;
  text-align: center;
  resize: none;
  box-sizing: border-box;
  padding: 3px;
  font-family: "Noto-Sans KR", sans-serif;

  @media screen and (max-width: ${mobile}) {
    font-size: 14px;
  }
`;
const OptionButtonGrid = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const CancleButton = styled.button`
  width: 290px;
  height: 40px;
  border: 1px solid #e25b45;
  border-radius: 8px;
  background-color: #ffffff;
  color: #e25b45;
  font-size: 16px;
  line-height: 23px;
  margin-top: 24px;
  cursor: pointer;
  &:hover {
    background-color: #e25b45;
    color: #ffffff;
  }
  @media screen and (max-width: ${mobile}) {
    transform: scale(0.8);
  }
`;
const CheckButton = styled.button`
  width: 290px;
  height: 40px;
  border: 1px solid #e25b45;
  border-radius: 8px;
  background-color: #e25b45;
  color: #ffffff;
  font-size: 16px;
  line-height: 23px;
  margin-top: 24px;
  cursor: pointer;
  &:hover {
    background-color: #ffffff;
    color: #e25b45;
  }
  @media screen and (max-width: ${mobile}) {
    transform: scale(0.8);
  }
`;
export default EitherWrite;
