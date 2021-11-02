import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";

import { history } from "../redux/configureStore";
import {
  deletePostDB,
  likePostDB,
  votePostDB,
} from "../redux/actions/eitherCard";

const EitherCard = props => {
  const dispatch = useDispatch();
  // const { deletePostDBDone } = useSelector(state => state.eitherCard);
  // useEffect(() => {
  //   if (deletePostDBDone) {
  //     alert("삭제가 완료되었습니다!");
  //     window.location.replace("/either");
  //     deletePostDBDone = false;
  //   }
  // }, [deletePostDBDone]);
  const {
    eitherId,
    nickname,
    title,
    contentA,
    contentB,
    date,
    likeCnt,
    voteCntA,
    voteCntB,
    liked,
    voted,
    completed,
  } = props;

  const [percent, setPercent] = useState("");
  const [likes, setLikes] = useState(likeCnt);
  const [voteA, setVoteA] = useState(voteCntA);
  const [voteB, setVoteB] = useState(voteCntB);
  const [choice, setChoice] = useState(voted);

  //Progress Bar 퍼센트 계산
  useEffect(() => {
    if (voteCntA === 0 && voteCntB === 0) {
      setPercent(50);
    } else if (voteCntA === 0) {
      setPercent(100);
    } else if (voteCntB === 0) {
      setPercent(0);
    } else {
      let calPercent = (voteCntA / (voteCntA + voteCntB)) * 100;
      setPercent(Math.round(calPercent));
    }
  }, [voteCntA, voteCntB]);

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
    if (liked !== null) {
      return;
    } else {
      dispatch(likePostDB(eitherId));
      setLikes(likeCnt + 1);
    }
  };
  //contentA 투표
  const onClickContentA = () => {
    dispatch(votePostDB({ eitherId, data: { vote: "A" } }));
    setVoteA(voteA);
    setChoice("A");
  };
  //contentB 투표
  const onClickContentB = () => {
    dispatch(votePostDB({ eitherId, data: { vote: "B" } }));
    setVoteB(voteB);
    setChoice("B");
  };

  return (
    <>
      <Container>
        <EitherText>
          <div>
            <b>OX</b>
            {/* 자신이 작성한 글에 따른 수정,삭제하기 버튼 보여주기 */}
            {nickname === userInfo.nickname ? (
              voteCntA + voteCntB !== 0 || completed === 1 ? (
                <div>
                  <button onClick={onClickDelete}>삭제하기</button>
                </div>
              ) : (
                <div>
                  <button onClick={onClickModify}>수정하기</button>
                  <button onClick={onClickDelete}>삭제하기</button>
                </div>
              )
            ) : null}
          </div>
          <h2>{title}</h2>
          {/* 투표 완료에 따른 종료 안내글 표시 */}
          {completed === 1 ? (
            <h2 style={{ color: "gray" }}>종료된 투표입니다</h2>
          ) : null}
        </EitherText>
        {/* 선택 결과에 따라 보여주기 */}
        {choice === "A" ? (
          <div>
            {completed === 1 ? (
              <EitherButton
                onClick={onClickContentA}
                style={{ backgroundColor: "orange" }}
                disabled
              >
                <h1>O</h1>
                <ButtonText>{contentA}</ButtonText>
              </EitherButton>
            ) : (
              <EitherButton
                onClick={onClickContentA}
                style={{ backgroundColor: "orange" }}
              >
                <h1>O</h1>
                <ButtonText>{contentA}</ButtonText>
              </EitherButton>
            )}
            {completed === 1 ? (
              <EitherButton onClick={onClickContentB} disabled>
                <h1>X</h1>
                <ButtonText>{contentB}</ButtonText>
              </EitherButton>
            ) : (
              <EitherButton onClick={onClickContentB}>
                <h1>X</h1>
                <ButtonText>{contentB}</ButtonText>
              </EitherButton>
            )}
          </div>
        ) : choice === "B" ? (
          <div>
            {completed === 1 ? (
              <EitherButton onClick={onClickContentA} disabled>
                <h1>O</h1>
                <ButtonText>{contentA}</ButtonText>
              </EitherButton>
            ) : (
              <EitherButton onClick={onClickContentA}>
                <h1>O</h1>
                <ButtonText>{contentA}</ButtonText>
              </EitherButton>
            )}
            {completed === 1 ? (
              <EitherButton
                onClick={onClickContentB}
                style={{ backgroundColor: "orange" }}
                disabled
              >
                <h1>X</h1>
                <ButtonText>{contentB}</ButtonText>
              </EitherButton>
            ) : (
              <EitherButton
                onClick={onClickContentB}
                style={{ backgroundColor: "orange" }}
              >
                <h1>X</h1>
                <ButtonText>{contentB}</ButtonText>
              </EitherButton>
            )}
          </div>
        ) : (
          <div>
            {completed === 1 ? (
              <EitherButton onClick={onClickContentA} disabled>
                <h1>O</h1>
                <ButtonText>{contentA}</ButtonText>
              </EitherButton>
            ) : (
              <EitherButton onClick={onClickContentA}>
                <h1>O</h1>
                <ButtonText>{contentA}</ButtonText>
              </EitherButton>
            )}
            {completed === 1 ? (
              <EitherButton onClick={onClickContentB} disabled>
                <h1>X</h1>
                <ButtonText>{contentB}</ButtonText>
              </EitherButton>
            ) : (
              <EitherButton onClick={onClickContentB}>
                <h1>X</h1>
                <ButtonText>{contentB}</ButtonText>
              </EitherButton>
            )}
          </div>
        )}
        <EitherProgress>
          <ProgressBar
            completed={percent}
            labelAlignment="center"
            height="15px"
            width="80%"
            labelSize="10px"
            margin="auto"
          />
        </EitherProgress>
        <EitherFooter>
          <div style={{ fontSize: "10px", padding: "0px 2em" }}>
            {nickname} {"|"} {date}
          </div>
          <div style={{ fontSize: "10px", padding: "0px 2em" }}>
            <button onClick={onClickLike}>좋아요</button> {likes}
          </div>
        </EitherFooter>
      </Container>
    </>
  );
};

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

const EitherProgress = styled.div`
  margin: 30px;
`;
const EitherButton = styled.button`
  width: 40%;
  height: 40%;
  &:active {
    background-color: black;
  }
`;
const EitherFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ButtonText = styled.h5`
  word-break: break-all;
`;
export default EitherCard;
