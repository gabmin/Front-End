import React from "react";
import styled from "styled-components";
import MultiSlick from "../components/MultiSlick";

const Multi = props => {
  const cardList = [
    {
      title: "title",
      description: "description",
      user: "user",
      date: "date",
      editedDate: "editedDate",
      completed: false,
      likeCnt: "0",
      commentCnt: "0",
    },
    {
      title: "title1",
      description: "description1",
      user: "user1",
      date: "date1",
      editedDate: "editedDate1",
      completed: false,
      likeCnt: "1",
      commentCnt: "1",
    },
    {
      title: "title2",
      description: "description2",
      user: "user2",
      date: "date2",
      editedDate: "editedDate2",
      completed: false,
      likeCnt: "2",
      commentCnt: "2",
    },
    {
      title: "title3",
      description: "description3",
      user: "user3",
      date: "date3",
      editedDate: "editedDate3",
      completed: false,
      likeCnt: "3",
      commentCnt: "3",
    },
  ];
  return (
    <Container>
      <TabBtndiv>
        <TabBtn>전체</TabBtn>
        <TabBtn>진행중</TabBtn>
        <TabBtn>종료됨</TabBtn>
      </TabBtndiv>
      <Sliderdiv>
        <MultiSlick cardList={cardList} />
      </Sliderdiv>
      <QuestionBtnDiv>
        <QuestionBtn>나도질문하기</QuestionBtn>
      </QuestionBtnDiv>
    </Container>
  );
};

const Container = styled.div`
  max-width: 100%;
`;

const TabBtndiv = styled.div`
  margin: 50px 0px;
  width: 100%;
  text-align: center;
`;

const TabBtn = styled.button`
  border: none;
  background-color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: #777777;
  }
`;

const Sliderdiv = styled.div`
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

export default Multi;
