import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import EitherCard from "../components/EitherCard";
import EitherCompleteCard from "../components/EitherCompleteCard";

import { history } from "../redux/configureStore";
import { PostDB, PostingDB } from "../redux/actions/eitherCard";

const EitherDetail = props => {
  const dispatch = useDispatch();

  //해당 eitherId
  const eitherId = props.match.params.either_id;
  //전체 게시글 정보
  const PostList = useSelector(state => state.eitherCard.eitherPost);
  const PostLists = PostList && PostList.either;
  //전체 게시글 중 해당 게시글 찾기
  const targetPost = PostLists?.find(p => p.eitherId == eitherId);

  useEffect(() => {
    //데이터 가져오기
    dispatch(PostDB());
    dispatch(PostingDB());
  }, [dispatch]);

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
          <EitherButton onClick={onClickGoBack}>돌아가기</EitherButton>
          <EitherButton onClick={onClickIndex}>목록</EitherButton>
        </EitherButtonGrid>
        {targetPost && targetPost.completed === 0 ? (
          <EitherCard
            eitherId={targetPost.eitherId}
            nickname={targetPost.nickname}
            title={targetPost.title}
            contentA={targetPost.contentA}
            contentB={targetPost.contentB}
            date={targetPost.date}
            likeCnt={targetPost.likeCnt}
            voteCntA={targetPost.voteCntA}
            voteCntB={targetPost.voteCntB}
            liked={targetPost.liked}
            voted={targetPost.voted}
            completed={targetPost.completed}
          />
        ) : null}
        {targetPost && targetPost.completed === 1 ? (
          <EitherCompleteCard
            eitherId={targetPost.eitherId}
            nickname={targetPost.nickname}
            title={targetPost.title}
            contentA={targetPost.contentA}
            contentB={targetPost.contentB}
            date={targetPost.date}
            likeCnt={targetPost.likeCnt}
            voteCntA={targetPost.voteCntA}
            voteCntB={targetPost.voteCntB}
            liked={targetPost.liked}
            voted={targetPost.voted}
            completed={targetPost.completed}
          />
        ) : null}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 773px;
`;
const EitherButtonGrid = styled.div`
  margin: 51px auto 0px auto;
  width: 100%;
  text-align: center;
  width: 401px;
  display: flex;
  justify-content: space-between;
`;
const EitherButton = styled.button`
  border: none;
  background-color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  color: #868e96;
  line-height: 29px;
  cursor: pointer;
  &:hover {
    color: #00397c;
    text-decoration: underline;
  }
`;

export default EitherDetail;
