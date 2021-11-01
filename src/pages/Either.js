import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import EitherSlick from "../components/EitherSlick";
import { PostDB, PostingDB, PostCompleteDB } from "../redux/actions/eitherCard";

const Either = props => {
  const dispatch = useDispatch();

  const { eitherPost, eitherPosting, eitherPostComplete } = useSelector(
    state => state.eitherCard,
  );
  // 전체, 진행중, 종료됨 게시글 리스트
  const PostList = eitherPost.either;
  const PostingList = eitherPosting.either;
  const PostCompleteList = eitherPostComplete.either;
  console.log("전체 리스트 불러옴", PostList);

  //보여주기 상태 (초기값 전체보기)
  const [status, setStatus] = useState("Post");

  //첫 화면에 전체 데이터 불러오기
  useEffect(() => {
    dispatch(PostDB());
    setStatus("Post");
  }, [dispatch]);
  //전체 게시글 보여주기
  const onClickPost = () => {
    dispatch(PostDB());
    setStatus("Post");
  };
  //진행중 게시글 보여주기
  const onClickPosting = () => {
    dispatch(PostingDB());
    setStatus("Posting");
  };
  //종료됨 게시글 보여주기
  const onClickCompletePost = () => {
    dispatch(PostCompleteDB());
    setStatus("CompletePost");
  };
  //게시글 작성하러가기
  const goToWrite = () => {
    history.push("/write");
  };
  return (
    <>
      <Wrap>
        <EitherButtonGrid>
          <EitherButton onClick={onClickPost}>전체</EitherButton>
          <EitherButton onClick={onClickPosting}>진행중</EitherButton>
          <EitherButton onClick={onClickCompletePost}>종료됨</EitherButton>
        </EitherButtonGrid>
        <SlickLayout>
          {status === "Post" ? <EitherSlick PostList={PostList} /> : null}
          {status === "Posting" ? (
            <EitherSlick PostingList={PostingList} />
          ) : null}
          {status === "CompletePost" ? (
            <EitherSlick PostCompleteList={PostCompleteList} />
          ) : null}
        </SlickLayout>
        <QuestionBtnDiv>
          <QuestionBtn onClick={goToWrite}>나도질문하기</QuestionBtn>
        </QuestionBtnDiv>
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
const QuestionBtnDiv = styled.div`
  margin: 50px 0px;
  width: 100%;
  text-align: center;
`;
const QuestionBtn = styled.button`
  border: none;
  background-color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: #777777;
  }
`;
export default Either;
