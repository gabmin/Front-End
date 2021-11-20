import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";

import { mobile, tablet } from "../shared/style";
import { history } from "../redux/configureStore";
import { editPostDB, completePostDB } from "../redux/actions/eitherCard";

const EitherEdit = props => {
  const dispatch = useDispatch();

  const [eitherState, setEitherState] = useState(true);
  const [multiState, setMultiState] = useState(false);
  const { eitherPost, editPostDBDone, completePostDBDone } = useSelector(
    state => state.eitherCard,
  );
  //유저정보(닉네임)
  const userInfo = useSelector(state => state.user.userInfo);

  //불러온 데이터가 없거나 새로고침 시 페이지 이동
  useEffect(() => {
    if (!postList || !userInfo.nickname) {
      history.push("/either");
    }
  }, []);
  //수정 후 알림창, 페이지 이동
  useEffect(() => {
    if (editPostDBDone) {
      alert("수정이 완료되었습니다.");
      window.location.replace("/either");
    }
  }, [editPostDBDone]);
  //종료 후 알림창, 페이지 이동
  useEffect(() => {
    if (completePostDBDone) {
      alert("투표가 완료되었습니다.");
      window.location.replace("/either");
    }
  }, [completePostDBDone]);
  //해당게시글 아이디
  const eitherId = props.match.params.either_id;
  //게시글 전체 리스트
  const postList = eitherPost.either;
  //해당게시글 가져오기
  const targetPost = postList?.find(p => p.eitherId == eitherId);
  //수정된 데이터
  const [title, setTitle] = useState(postList ? targetPost.title : null);
  const [contentA, setContentA] = useState(
    postList ? targetPost.contentA : null,
  );
  const [contentB, setContentB] = useState(
    postList ? targetPost.contentB : null,
  );

  //제목 데이터
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

  // 수정된 날짜
  const editedDate = moment().format("YYYY-MM-DD HH:mm:ss");

  //뒤로가기
  const onClickCancle = useCallback(() => {
    history.push("/either");
  });
  //radio 버튼
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

  //수정하기
  const onClickEdit = () => {
    dispatch(
      editPostDB({ eitherId, data: { title, contentA, contentB, editedDate } }),
    );
  };

  return (
    <>
      <Wrap>
        <ContentBox>
          <Index>
            <p>구분</p>
            <div>
              <RadioBtnWarpperE>
                <input
                  name="write"
                  type="radio"
                  id="either"
                  checked={eitherState}
                  onChange={EitherRadioBtn}
                  disabled
                />
                <label>찬반</label>
              </RadioBtnWarpperE>
              <RadioBtnWarpperM>
                <input
                  name="write"
                  type="radio"
                  id="multi"
                  checked={multiState}
                  onChange={MultiRadioBtn}
                  disabled
                />
                <label>객관식</label>
              </RadioBtnWarpperM>
            </div>
          </Index>
          <Container>
            <hr />
            <Title>
              <p>제목</p>
              <Input
                type="text"
                placeholder="질문을 입력해주세요. (40자 이내)"
                value={title}
                onChange={onChangeTitle}
              />
            </Title>
            <hr />
            <EitherButtonGrid>
              <EitherButtonA>
                <ButtonInput
                  placeholder="박스를 클릭해서 항목에 대한 상세 설명을 입력해보세요. (30자 이내)"
                  value={contentA}
                  onChange={onChangeContentA}
                />
              </EitherButtonA>
              <EitherButtonB>
                <ButtonInput
                  placeholder="박스를 클릭해서 항목에 대한 상세 설명을 입력해보세요. (30자 이내)"
                  value={contentB}
                  onChange={onChangeContentB}
                />
              </EitherButtonB>
            </EitherButtonGrid>
            <hr />
            <OptionButtonGrid>
              <CancleButton onClick={onClickCancle}>취소</CancleButton>
              <CheckButton onClick={onClickEdit}>완료</CheckButton>
            </OptionButtonGrid>
          </Container>
        </ContentBox>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  max-width: 840px;
  width: 90%;
  margin: auto;
`;
const ContentBox = styled.div`
  border: 2px solid #00397c;
  max-width: 840px;
  box-sizing: border-box;
  margin: 56px auto;
  border-radius: 10px;
  padding: 4% 110px 4% 110px;
  @media screen and (max-width: ${mobile}) {
    padding: 7%;
    margin: 10% auto;
  }
`;
const Index = styled.div`
  display: flex;
  p {
    font-size: 18px;
    color: #101214;
    font-weight: bold;
    line-height: 26px;
    margin: 0px;
    @media screen and (max-width: ${mobile}) {
      font-size: 16px;
    }
  }
  div {
    display: flex;
  }
  margin: 0px 0px 22px 0px;
  @media screen and (max-width: ${mobile}) {
    margin: 0px 0px 10px 0px;
  }
`;
const RadioBtnWarpperE = styled.div`
  display: flex;
  margin: 0px 0px 0px 76px;
  align-items: center;
  label {
    font-size: 16px;
    @media screen and (max-width: ${mobile}) {
      font-size: 14px;
      width: 40px;
    }
  }
  input {
    margin: 0px 8px 0px 0px;
  }
  @media screen and (max-width: ${mobile}) {
    margin: 0px 0px 0px 20%;
  }
`;
const RadioBtnWarpperM = styled.div`
  display: flex;
  margin: 0px 0px 0px 47px;
  align-items: center;
  label {
    font-size: 16px;
    @media screen and (max-width: ${mobile}) {
      font-size: 14px;
      width: 40px;
    }
  }
  input {
    margin: 0px 8px 0px 0px;
  }
  @media screen and (max-width: ${mobile}) {
    margin: 0px 0px 0px 20%;
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  hr {
    margin: 0px;
    border: none;
    height: 1px;
    border-color: #eeeeee;
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
  cursor: pointer;
  margin-top: 24px;
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
  cursor: pointer;
  margin-top: 24px;
  &:hover {
    background-color: #ffffff;
    color: #e25b45;
  }
  @media screen and (max-width: ${mobile}) {
    transform: scale(0.8);
  }
`;
export default EitherEdit;
