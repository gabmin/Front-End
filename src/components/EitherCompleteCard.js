import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";

import { history } from "../redux/configureStore";
import { deletePostDB, likePostDB } from "../redux/actions/eitherCard";

const EitherCompleteCard = props => {
  const dispatch = useDispatch();
  let {
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
  } = props;

  //유저정보(닉네임)
  const userInfo = useSelector(state => state.user.userInfo);
  const [percent, setPercent] = useState("");
  const [likes, setLikes] = useState(likeCnt);

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

  //삭제하기
  const onClickDelete = () => {
    dispatch(deletePostDB(eitherId));
    alert("삭제되었습니다.");
    history.push("/either");
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

  return (
    <>
      <Container>
        <EitherText>
          <div>
            <b>OX</b>
            {nickname === userInfo.nickname ? (
              <div>
                <button onClick={onClickDelete}>삭제하기</button>
              </div>
            ) : null}
          </div>
          <h2>{title}</h2>
          <h2 style={{ color: "gray" }}>종료된 투표입니다</h2>
        </EitherText>
        <div>
          {voteCntA === voteCntB ? (
            <div>
              <EitherButton style={{ backgroundColor: "orange" }} disalbed>
                <h1>O</h1>
                <h5>{contentA}</h5>
              </EitherButton>
              <EitherButton style={{ backgroundColor: "orange" }} disalbed>
                <h1>X</h1>
                <h5>{contentB}</h5>
              </EitherButton>
            </div>
          ) : voteCntA > voteCntB ? (
            <div>
              <EitherButton style={{ backgroundColor: "orange" }} disalbed>
                <h1>O</h1>
                <h5>{contentA}</h5>
              </EitherButton>
              <EitherButton disalbed>
                <h1>X</h1>
                <h5>{contentB}</h5>
              </EitherButton>
            </div>
          ) : (
            <div>
              <EitherButton disalbed>
                <h1>O</h1>
                <h5>{contentA}</h5>
              </EitherButton>
              <EitherButton style={{ backgroundColor: "orange" }} disalbed>
                <h1>X</h1>
                <h5>{contentB}</h5>
              </EitherButton>
            </div>
          )}
        </div>
        <EitherProgress>
          <ProgressBar
            completed={percent}
            height="15px"
            width="90%"
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
`;
const EitherFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default EitherCompleteCard;
