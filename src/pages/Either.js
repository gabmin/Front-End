import React from "react";
import styled from "styled-components";
import EitherSlick from "../components/EitherSlick";

const Either = props => {
  const cardList = [
    {
      title: "삼전 9층인데 익절해야할까요?",
      contentA: "ㅇㅇ익절ㄱㄱ",
      contentB: "ㄴㄴ 존버가 답이다",
      user: "김개미",
      date: "13분전",
      likeCnt: 11,
    },
    {
      title: "카카오 9층인데 익절해야할까요?",
      contentA: "ㅇㅇ익절ㄱㄱ",
      contentB: "ㄴㄴ 존버가 답이다",
      user: "김개미",
      date: "13분전",
      likeCnt: 11,
    },
    {
      title: "네이버 9층인데 익절해야할까요?",
      contentA: "ㅇㅇ익절ㄱㄱ",
      contentB: "ㄴㄴ 존버가 답이다",
      user: "김개미",
      date: "13분전",
      likeCnt: 17,
    },
    {
      title: "제주항공 9층인데 익절해야할까요?",
      contentA: "ㅇㅇ익절ㄱㄱ",
      contentB: "ㄴㄴ 존버가 답이다",
      user: "김개미",
      date: "13분전",
      likeCnt: 13,
    },
    {
      title: "애플 9층인데 익절해야할까요?",
      contentA: "ㅇㅇ익절ㄱㄱ",
      contentB: "ㄴㄴ 존버가 답이다",
      user: "김개미",
      date: "13분전",
      likeCnt: 14,
    },
    {
      title: "테슬라 9층인데 익절해야할까요?",
      contentA: "ㅇㅇ익절ㄱㄱ",
      contentB: "ㄴㄴ 존버가 답이다",
      user: "김개미",
      date: "13분전",
      likeCnt: 15,
    },
  ];
  return (
    <>
      <Wrap>
        <EitherButtonGrid>
          <EitherButton>전체</EitherButton>
          <EitherButton>진행중</EitherButton>
          <EitherButton>종료됨</EitherButton>
        </EitherButtonGrid>
        <SlickLayout>
          <EitherSlick cardList={cardList} />
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

export default Either;
