import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";

import { history } from "../redux/configureStore";
import {
  deletePostDB,
  likePostDB,
  votePostDB,
  PostDB,
  PostingDB,
} from "../redux/actions/eitherCard";

const EitherDetail = props => {
  const dispatch = useDispatch();

  //해당 eitherId
  const eitherId = props.match.params.either_id;
  //유저정보(닉네임)
  const userInfo = useSelector(state => state.user.userInfo);
  //전체 게시글 정보
  const PostList = useSelector(state => state.eitherCard.eitherPost);
  const PostLists = PostList && PostList.either;
  //전체 게시글 중 해당 게시글 찾기
  const targetPost = PostLists?.find(p => p.eitherId == eitherId);
  console.log(targetPost);
  const [percent, setPercent] = useState("");
  const [likes, setLikes] = useState(targetPost && targetPost.likeCnt);

  useEffect(() => {
    //데이터 가져오기
    dispatch(PostDB());
    dispatch(PostingDB());
  }, [dispatch]);

  useEffect(() => {
    if (targetPost?.voteCntA === 0 && targetPost?.voteCntB === 0) {
      setPercent(50);
    } else if (targetPost?.voteCntA === 0) {
      setPercent(100);
    } else if (targetPost?.voteCntB === 0) {
      setPercent(0);
    } else {
      let calPercent =
        (targetPost?.voteCntA / (targetPost?.voteCntA + targetPost?.voteCntB)) *
        100;
      setPercent(Math.round(calPercent));
    }
  }, [targetPost]);

  useEffect(() => {
    setLikes(targetPost?.likeCnt);
  }, [targetPost]);
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
    if (targetPost?.liked !== null) {
      return;
    } else {
      dispatch(likePostDB(eitherId));
      setLikes(targetPost.likeCnt + 1);
    }
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
  //목록으로 돌아가기
  const onClickIndex = () => {
    history.push("/");
  };

  return (
    <>
      <Wrap>
        <EitherButtonGrid>
          <ManuButton onClick={onClickGoBack}>돌아가기</ManuButton>
          <ManuButton onClick={onClickIndex}>목록</ManuButton>
        </EitherButtonGrid>
        <Container>
          <EitherText>
            <div>
              <b>OX</b>
              {/* 한개이상의 투표가 있으면 수정불가 */}
              {targetPost?.nickname === userInfo ? (
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
            <h2>{targetPost?.title}</h2>
            {/* 종료된 투표일 경우 표시 */}
            {targetPost?.completed === 1 ? (
              <h2 style={{ color: "gray" }}>종료된 투표입니다</h2>
            ) : null}
          </EitherText>
          {targetPost?.voted === 1 || targetPost?.completed === 1 ? (
            <div>
              <ChoiceButton onClick={onClickContentA} disabled>
                <h1>O</h1>
                <h5>{targetPost?.contentA}</h5>
              </ChoiceButton>
              <ChoiceButton onClick={onClickContentB} disabled>
                <h1>X</h1>
                <h5>{targetPost?.contentB}</h5>
              </ChoiceButton>
            </div>
          ) : (
            <div>
              <ChoiceButton onClick={onClickContentA}>
                <h1>O</h1>
                <h5>{targetPost?.contentA}</h5>
              </ChoiceButton>
              <ChoiceButton onClick={onClickContentB}>
                <h1>X</h1>
                <h5>{targetPost?.contentB}</h5>
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
            <div style={{ fontSize: "15px", padding: "0px 2em" }}>
              {targetPost?.nickname} {"|"} {targetPost?.date}
            </div>
            <div style={{ fontSize: "15px", padding: "0px 2em" }}>
              <button onClick={onClickLike}>좋아요</button> {likes}
            </div>
          </EitherFooter>
        </Container>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const EitherButtonGrid = styled.div`
  margin: 50px 0px;
  width: 100%;
  text-align: center;
`;
const ManuButton = styled.button`
  border: none;
  background-color: #fff;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: green;
  }
`;
const Container = styled.div`
  text-align: center;
  width: 50%;
  height: auto;
  margin: 100px auto;
  border: 1px solid black;
  border-radius: 10px;
  padding: 1em;
  background-color: white;
`;
const EitherText = styled.div`
  width: 100%;
`;
const ChoiceButton = styled.button`
  width: 40%;
  height: 60%;
`;
const EitherProgress = styled.div`
  margin: 30px;
`;
const EitherFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default EitherDetail;
