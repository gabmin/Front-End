import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import MainSlick from "../components/MainSlick";
import { getMainData } from "../redux/actions/main";

const Main = () => {
  const dispatch = useDispatch();

  const { either, multi, attendNum, postingNum } = useSelector(
    state => state.main.mainPosts,
  );

  useEffect(() => {
    dispatch(getMainData());
  }, [dispatch]);

  // const cardList = [
  //   {
  //     title: "삼전 풀매수 가나요?",
  //     content: "내용입니다",
  //     username: "김개미",
  //     commentNum: 1,
  //     likeNum: 11,
  //   },
  //   {
  //     title: "삼전 풀매수 가나요?2",
  //     content: "내용입니다2",
  //     username: "김개미",
  //     commentNum: 2,
  //     likeNum: 12,
  //   },
  //   {
  //     title: "삼전 풀매수 가나요?3",
  //     content: "내용입니다3",
  //     username: "김개미",
  //     commentNum: 3,
  //     likeNum: 13,
  //   },
  //   {
  //     title: "삼전 풀매수 가나요?4",
  //     content: "내용입니다4",
  //     username: "김개미",
  //     commentNum: 4,
  //     likeNum: 14,
  //   },
  //   {
  //     title: "삼전 풀매수 가나요?5",
  //     content: "내용입니다5",
  //     username: "김개미",
  //     commentNum: 5,
  //     likeNum: 15,
  //     Comment: {
  //       parentComment: "zzz",
  //     },
  //   },
  // ];

  return (
    <Container>
      <Notice>
        <h1>개미들의 곡소리</h1>
        <h3>고민을 올려보세요</h3>
      </Notice>

      <Wrapper height="100px" justify="end">
        <CountContainer>
          <span>고민 : {postingNum}</span> <span>참여 : {attendNum}</span>
        </CountContainer>
      </Wrapper>
      <Wrapper height="300px">
        <MainSlick cardList={either} type="either"></MainSlick>
      </Wrapper>
      <Wrapper height="300px">
        <MainSlick cardList={multi} type="multi"></MainSlick>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  height: 1200px;
  /* background-color: royalblue; */
  border: 1px solid gray;
  margin: auto;
`;

const Notice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 300px;
  background-color: silver;
  h1,
  h3 {
    margin: 10px 100px;
  }
`;

const CountContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100%;
  border: 1px solid lightgray;

  span {
    margin: 0.5em 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: ${props => (props.justify ? props.justify : "center")};
  width: 80%;
  height: ${props => props.height};
  /* background-color: gray; */
  border: 1px solid gray;
  margin: 50px 0 0;
`;

export default Main;
