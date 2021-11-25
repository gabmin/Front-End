import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { mobile, tablet } from "../shared/style";
import { history } from "../redux/configureStore";
import EitherSlick from "../components/EitherSlick";
import EitherPagination from "../components/EitherPagination";
import { PostDB, PostingDB, PostCompleteDB } from "../redux/actions/eitherCard";
import LoadingBubble from "../elements/LoadingBubble";
import { BsCardText, BsList } from "react-icons/bs";

const Either = props => {
  const dispatch = useDispatch();
  //게시글 리스트 (전체, 진행중, 종료)
  const { eitherPost, eitherPosting, eitherPostComplete } = useSelector(
    state => state.eitherCard,
  );
  const {
    PostDBDone,
    PostDBLoading,
    PostingDBDone,
    PostingDBLoading,
    PostCompleteDBDone,
    PostCompleteDBLoading,
  } = useSelector(state => state.eitherCard);

  //유저정보(닉네임)
  const userNickname = localStorage.getItem("nickname");
  //이전 페이지 파람스 아이디 가져오기
  const paramsId = useSelector(state => state.params.paramsId);
  // 전체, 진행중, 종료됨 게시글 리스트
  const PostList = eitherPost.either;
  const PostingList = eitherPosting.either;
  const PostCompleteList = eitherPostComplete.either;

  const [select, setSelect] = useState("checkEither");
  const [grid, setGrid] = useState("slick");

  //보여주기 상태 (초기값 전체보기)
  const [status, setStatus] = useState("Post");

  //첫 화면에 전체 데이터 불러오기
  useEffect(() => {
    dispatch(PostDB(paramsId));
    dispatch(PostingDB(paramsId));
    setStatus("Post");
  }, [dispatch, paramsId, grid]);

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
    if (!userNickname) {
      alert("로그인 후 가능합니다.");
      history.push("/login");
    } else {
      history.push({
        pathname: "/write",
        state: { select: select },
      });
    }
  };

  // 카드 형식으로 보여주기
  const setSlickCard = () => {
    setGrid("slick");
  };

  // 리스트 형식으로 보여주기
  const setListCard = () => {
    setGrid("list");
  };

  return (
    <Container>
      <Wrap>
        <EitherButtonGrid>
          {status === "Post" ? ( //전체보기일때 CSS 적용
            <EitherButton
              onClick={onClickPost}
              style={{
                color: "#00397c",
                textDecoration: "underline",
                textUnderlinePosition: "under",
              }}
            >
              전체
            </EitherButton>
          ) : (
            <EitherButton onClick={onClickPost}>전체</EitherButton>
          )}
          {status === "Posting" ? ( //진행중보기일때 CSS 적용
            <EitherButton
              onClick={onClickPosting}
              style={{
                color: "#00397c",
                textDecoration: "underline",
                textUnderlinePosition: "under",
              }}
            >
              진행중
            </EitherButton>
          ) : (
            <EitherButton onClick={onClickPosting}>진행중</EitherButton>
          )}
          {status === "CompletePost" ? ( //종료됨보기일때 CSS 적용
            <EitherButton
              onClick={onClickCompletePost}
              style={{
                color: "#00397c",
                textDecoration: "underline",
                textUnderlinePosition: "under",
              }}
            >
              종료됨
            </EitherButton>
          ) : (
            <EitherButton onClick={onClickCompletePost}>종료됨</EitherButton>
          )}
        </EitherButtonGrid>
        <FormatWrapper>
          <FormatChangeGrid>
            {grid === "slick" ? (
              <BsCardText // 카드형식으로 보기 버튼 (파란색)
                onClick={setSlickCard}
                style={{
                  width: "32px",
                  height: "32px",
                  color: "#00397c",
                  cursor: "pointer",
                }}
              ></BsCardText>
            ) : (
              <BsCardText // 카드형식으로 보기 버튼 (회색)
                onClick={setSlickCard}
                style={{
                  width: "32px",
                  height: "32px",
                  color: "#ADB5BD",
                  cursor: "pointer",
                }}
              ></BsCardText>
            )}
            {grid === "list" ? (
              <BsList // 리스트형식으로 보기 버튼 (파란색)
                onClick={setListCard}
                style={{
                  width: "32px",
                  height: "32px",
                  color: "#00397c",
                  cursor: "pointer",
                }}
              ></BsList>
            ) : (
              <BsList // 리스트형식으로 보기 버튼 (회색)
                onClick={setListCard}
                style={{
                  width: "32px",
                  height: "32px",
                  color: "#ADB5BD",
                  cursor: "pointer",
                }}
              ></BsList>
            )}
          </FormatChangeGrid>
          <QuestionBtn onClick={goToWrite}>질문하기</QuestionBtn>
        </FormatWrapper>
        {grid === "slick" ? ( //카드형식
          <SlickLayout>
            {PostDBLoading ? <LoadingBubble /> : null}
            {PostingDBLoading ? <LoadingBubble /> : null}
            {PostCompleteDBLoading ? <LoadingBubble /> : null}
            {PostDBDone && status === "Post" ? (
              <EitherSlick PostList={PostList} />
            ) : null}
            {PostingDBDone && status === "Posting" ? (
              <EitherSlick PostingList={PostingList} />
            ) : null}
            {PostCompleteDBDone && status === "CompletePost" ? (
              <EitherSlick PostCompleteList={PostCompleteList} />
            ) : null}
          </SlickLayout>
        ) : (
          //리스트형식
          <SlickLayout>
            {PostDBLoading ? <LoadingBubble /> : null}
            {PostingDBLoading ? <LoadingBubble /> : null}
            {PostCompleteDBLoading ? <LoadingBubble /> : null}
            {PostDBDone && status === "Post" ? (
              <EitherPagination items={PostList} />
            ) : null}
            {PostingDBDone && status === "Posting" ? (
              <EitherPagination items={PostingList} />
            ) : null}
            {PostCompleteDBDone && status === "CompletePost" ? (
              <EitherPagination items={PostCompleteList} />
            ) : null}
          </SlickLayout>
        )}
      </Wrap>
    </Container>
  );
};
const Container = styled.div`
  max-width: 1280px;
  height: 100%;
  margin: auto;
  @media screen and (max-width: ${mobile}) {
    max-width: 768px;
  }
`;
const Wrap = styled.div`
  max-width: 100%;
  height: 100%;
`;
const EitherButtonGrid = styled.div`
  margin: 51px auto 0px auto;
  text-align: center;
  width: 401px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: ${mobile}) {
    max-width: 300px;
    width: 100%;
    margin: 30px auto 0px auto;
  }
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
    text-underline-position: under;
  }
  @media screen and (max-width: ${mobile}) {
    font-size: 17px;
  }
`;
const SlickLayout = styled.div`
  margin: 0px auto;
  width: 100%;
  height: 100%;
`;
const FormatWrapper = styled.div`
  width: 65%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: ${mobile}) {
    width: 75%;
  }
`;
const FormatChangeGrid = styled.div`
  width: 13%;
  display: flex;
  z-index: 10;
  justify-content: space-between;
  @media screen and (max-width: ${mobile}) {
    transform: scale(0.8);
    width: 27%;
  }
`;
const QuestionBtn = styled.button`
  width: 132px;
  height: 40px;
  border: 1px solid #e25b45;
  color: #e25b45;
  font-size: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;
  z-index: 10;
  &:hover {
    background-color: #e25b45;
    color: #ffffff;
  }
  @media screen and (max-width: ${mobile}) {
    transform: scale(0.9);
  }
`;
export default Either;
