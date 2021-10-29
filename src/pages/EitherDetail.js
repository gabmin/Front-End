import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";

import { history } from "../redux/configureStore";
import {
  deletePostDB,
  likePostDB,
  votePostDB,
  detailPostDB,
} from "../redux/actions/eitherCard";

const EitherDetail = props => {
  const dispatch = useDispatch();

  const { detailPost } = useSelector(state => state.eitherCard);
  const [percent, setPercent] = useState("");

  //해당 게시글 정보
  const targetPost = detailPost.either[0];
  console.log(targetPost.title);
  // 해당 eitherId
  const eitherId = props.match.params.either_id;
  //유저정보(닉네임)
  const userInfo = useSelector(state => state.user.userInfo);
  //수정하기
  const onClickModify = () => {
    history.push(`/either/${eitherId}/edit`);
  };
  //삭제하기
  const onClickDelete = () => {
    dispatch(deletePostDB(eitherId));
  };
  //좋아요
  const onClickLike = () => {
    dispatch(likePostDB(eitherId));
  };
  //contentA 투표
  const onClickContentA = () => {
    dispatch(votePostDB({ eitherId, data: { vote: "A" } }));
  };
  //contentB 투표
  const onClickContentB = () => {
    dispatch(votePostDB({ eitherId, data: { vote: "B" } }));
  };
  //돌아가기
  const onClickGoBack = () => {
    history.goBack();
  };
  //돌아가기
  const onClickIndex = () => {
    history.push("/");
  };

  useEffect(() => {
    //특정페이지 데이터 가져오기
    dispatch(detailPostDB(eitherId));
    // Progress Bar 퍼센트 계산
    if (targetPost.voteCntA === 0) {
      setPercent(100);
    } else if (targetPost.voteCntB === 0) {
      setPercent(0);
    } else {
      let calPercent =
        (targetPost.voteCntA / (targetPost.voteCntA + targetPost.voteCntB)) *
        100;
      setPercent(Math.round(calPercent));
    }
  }, []);

  return (
    <>
      <Wrap>
        <EitherButtonGrid>
          <EitherButton onClick={onClickGoBack}>돌아가기</EitherButton>
          <EitherButton onClick={onClickIndex}>목록</EitherButton>
        </EitherButtonGrid>
        <SlickLayout>
          <Container>
            <EitherText>
              <div>
                <b>OX</b>
                {targetPost.nickname === userInfo ? (
                  targetPost.voteCntA + targetPost.voteCntB === 0 ? (
                    <div>
                      <button onClick={onClickModify}>수정하기</button>
                      <button onClick={onClickDelete}>삭제하기</button>
                    </div>
                  ) : (
                    <div>
                      <button onClick={onClickDelete}>삭제하기</button>
                    </div>
                  )
                ) : null}
              </div>
              <h2>{targetPost.title}</h2>
            </EitherText>
            {targetPost.voted === 1 ? (
              <div>
                <ChoiceButton onClick={onClickContentA} disabled>
                  <h1>O</h1>
                  <h5>{targetPost.contentA}</h5>
                </ChoiceButton>
                <ChoiceButton onClick={onClickContentB} disabled>
                  <h1>X</h1>
                  <h5>{targetPost.contentB}</h5>
                </ChoiceButton>
              </div>
            ) : (
              <div>
                <ChoiceButton onClick={onClickContentA}>
                  <h1>O</h1>
                  <h5>{targetPost.contentA}</h5>
                </ChoiceButton>
                <ChoiceButton onClick={onClickContentB}>
                  <h1>X</h1>
                  <h5>{targetPost.contentB}</h5>
                </ChoiceButton>
              </div>
            )}
            <EitherProgress>
              <ProgressBar
                completed={percent}
                labelAlignment="center"
                height="15px"
                width="90%"
                labelSize="10px"
                margin="auto"
              />
            </EitherProgress>
            <EitherFooter>
              <div style={{ fontSize: "10px", padding: "0px 2em" }}>
                {targetPost.nickname} {"|"} {targetPost.date}
              </div>
              <div style={{ fontSize: "10px", padding: "0px 2em" }}>
                <button onClick={onClickLike}>좋아요</button>{" "}
                {targetPost.likeCnt}
              </div>
            </EitherFooter>
          </Container>
        </SlickLayout>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  max-width: 100%;
`;

const EitherButtonGrid = styled.div`
  margin: 50px 0px;
  width: 100%;
  text-align: center;
`;

const EitherButton = styled.button`
  border: none;
  background-color: #fff;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: green;
  }
`;
const SlickLayout = styled.div`
  margin: 100px auto;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  text-align: center;
  width: 80%;
  height: auto;
  margin: 100px auto;
  border: 1px solid black;
  border-radius: 10px;
  padding: 1em;
  opacity: 0.3;
  background-color: white;
`;
const EitherText = styled.div`
  width: 100%;
`;
const ChoiceButton = styled.button`
  width: 40%;
  height: 40%;
`;
const EitherProgress = styled.div`
  margin: 30px;
`;
const EitherFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default EitherDetail;
