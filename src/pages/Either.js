import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import EitherSlick from "../components/EitherSlick";
import { PostDB, PostingDB, PostCompleteDB } from "../redux/actions/eitherCard";

const Either = props => {
  const dispatch = useDispatch();
  //게시글 리스트 (전체, 진행중, 종료)
  const { eitherPost, eitherPosting, eitherPostComplete } = useSelector(
    state => state.eitherCard,
  );
  //유저정보(닉네임)
  const userInfo = useSelector(state => state.user.userInfo);
  //이전 페이지 파람스 아이디 가져오기
  const paramsId = useSelector(state => state.params.paramsId);
  // 전체, 진행중, 종료됨 게시글 리스트
  const PostList = eitherPost.either;
  const PostingList = eitherPosting.either;
  const PostCompleteList = eitherPostComplete.either;

  const [select, setSelect] = useState("checkEither");

  //보여주기 상태 (초기값 전체보기)
  const [status, setStatus] = useState("Post");

  //첫 화면에 전체 데이터 불러오기
  useEffect(() => {
    dispatch(PostDB(paramsId));
    dispatch(PostingDB(paramsId));
    setStatus("Post");
  }, [dispatch, paramsId]);
  //전체 게시글 보여주기
  const onClickPost = () => {
    dispatch(PostDB(paramsId));
    setStatus("Post");
  };
  //진행중 게시글 보여주기
  const onClickPosting = () => {
    dispatch(PostingDB(paramsId));
    setStatus("Posting");
  };
  //종료됨 게시글 보여주기
  const onClickCompletePost = () => {
    dispatch(PostCompleteDB(paramsId));
    setStatus("CompletePost");
  };
  //게시글 작성하러가기
  const goToWrite = () => {
    if (!userInfo.nickname) {
      alert("로그인 후 가능합니다.");
      history.push("/login");
    } else {
      history.push({
        pathname: "/write",
        state: { select: select },
      });
    }
  };
  return (
    <Container>
      <Wrap>
        <EitherButtonGrid>
          {status === "Post" ? (
            <EitherButton
              onClick={onClickPost}
              style={{ color: "#00397c", textDecoration: "underline" }}
            >
              전체
            </EitherButton>
          ) : (
            <EitherButton onClick={onClickPost}>전체</EitherButton>
          )}
          {status === "Posting" ? (
            <EitherButton
              onClick={onClickPosting}
              style={{ color: "#00397c", textDecoration: "underline" }}
            >
              진행중
            </EitherButton>
          ) : (
            <EitherButton onClick={onClickPosting}>진행중</EitherButton>
          )}
          {status === "CompletePost" ? (
            <EitherButton
              onClick={onClickCompletePost}
              style={{ color: "#00397c", textDecoration: "underline" }}
            >
              종료됨
            </EitherButton>
          ) : (
            <EitherButton onClick={onClickCompletePost}>종료됨</EitherButton>
          )}
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
          <QuestionBtn onClick={goToWrite}>질문하기</QuestionBtn>
        </QuestionBtnDiv>
      </Wrap>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 909px;
`;
const Wrap = styled.div`
  max-width: 100%;
  height: 733px;
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
const SlickLayout = styled.div`
  margin: 0px auto;
  width: 100%;
  height: 100%;
`;
const QuestionBtnDiv = styled.div`
  width: 100%;
  text-align: center;
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
export default Either;
