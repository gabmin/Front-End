import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
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
  //유저정보(닉네임)
  const userInfo = useSelector(state => state.user.userInfo);
  const PostLists = PostList && PostList.either;
  //전체 게시글 중 해당 게시글 찾기
  const targetPost = PostLists?.find(p => p.eitherId == eitherId);
  console.log(userInfo);
  useEffect(() => {
    //데이터 가져오기
    dispatch(PostDB());
    dispatch(PostingDB());
  }, [dispatch]);
  //비로그인시 접근 제한
  if (userInfo.nickname === "GUEST") {
    alert("로그인 후 이용가능합니다.");
    history.push("/login");
  }
  //돌아가기
  const onClickGoBack = () => {
    history.goBack();
  };
  //게시글 작성하러가기
  const goToWrite = () => {
    if (userInfo.nickname === "GEUST") {
      alert("로그인 후 가능합니다.");
      history.push("/login");
    } else {
      history.push("/write");
    }
  };
  return (
    <>
      <Wrap>
        <GoBackGrid>
          <AiOutlineArrowLeft className="ICON" onClick={onClickGoBack} />
        </GoBackGrid>
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
        <QuestionBtnDiv>
          <QuestionBtn onClick={goToWrite}>질문하기</QuestionBtn>
        </QuestionBtnDiv>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 773px;
`;
const GoBackGrid = styled.div`
  position: absolute;
  left: 36.5%;
  top: 24%;
  cursor: pointer;
  .ICON {
    width: 32px;
    height: 32px;
    color: #adb5bd;
  }
`;
const QuestionBtnDiv = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 48px;
`;
const QuestionBtn = styled.button`
  width: 180px;
  height: 40px;
  border: 1px solid #e25b45;
  color: #e25b45;
  font-size: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #e25b45;
    color: #ffffff;
  }
`;
export default EitherDetail;
