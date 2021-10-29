import React, { useCallback, useEffect, useState } from "react";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";

import { editPostDB, completePostDB } from "../redux/actions/eitherCard";

const EitherEdit = props => {
  const dispatch = useDispatch();

  const [eitherState, setEitherState] = useState(true);
  const [multiState, setMultiState] = useState(false);
  const { eitherPost, completePostDBDone } = useSelector(
    state => state.eitherCard,
  );

  //불러온 데이터가 없거나 새로고침 시 페이지 이동
  useEffect(() => {
    if (!postList) {
      history.push("/either");
    }
  }, []);

  //해당게시글 아이디
  const eitherId = props.match.params.either_id;
  //게시글 전체 리스트
  const postList = eitherPost.either;
  //해당게시글 가져오기
  const targetPost = postList?.find(p => p.eitherId == eitherId);
  console.log(postList);
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
  const onClickBack = useCallback(() => {
    history.push("/either");
  });

  //목록으로가기
  const onClickIndex = useCallback(() => {
    history.push("/");
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
    alert("수정되었습니다.");
    history.push("/either");
  };
  //완료하기
  const onClickComplete = () => {
    dispatch(completePostDB(eitherId));
    if (completePostDBDone) {
      alert("투표가 종료되었습니다.");
    }
  };

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
              <button onClick={onClickEdit}>수정하기</button>
            </div>
            {targetPost?.completed === 0 ? (
              <div>
                <button onClick={onClickComplete}>종료하기</button>
              </div>
            ) : null}
          </VoteBox>
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
  height: 100%;
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
`;

const ButtonInput = styled.input`
  border: none;
  outline: none;
  width: 80%;
  text-align: center;
`;

export default EitherEdit;
