import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import EitherSlick from "../components/EitherSlick";
import { PostDB, PostingDB, PostCompleteDB } from "../redux/actions/eitherCard";

const Either = props => {
  const dispatch = useDispatch();
  const { eitherPost, eitherPosting, eitherPostComplete } = useSelector(
    state => state.eitherCard,
  );

  console.log(eitherPost);
  useEffect(() => {
    dispatch(PostDB());
  }, []);

  const onClickPost = () => {
    dispatch(PostDB());
  };
  const onClickPosting = () => {
    dispatch(PostingDB());
  };
  const onClickCompletePost = () => {
    dispatch(PostCompleteDB());
  };

  // const cardList = [{
  //   eitherId: eitherPost.eitherId,
  //   title: eitherPost.title,
  //   contentA: eitherPost.contentA,
  //   contentB: eitherPost.contentB,
  //   date: eitherPost.date,
  //   complete: eitherPost.complete,
  //   edited: eitherPost.edited,
  //   editedDate: eitherPost.editedDate,
  //   likeCnt: eitherPost.likeCnt,
  //   user: eitherPost.user,
  //   voteCntA: eitherPost.voteCntA,
  //   voteCntB: eitherPost.voteCntB,
  //   nickname: eitherPost.nickname,
  //   voted: eitherPost.voted,
  // }]
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
          <EitherButton onClick={onClickPost}>전체</EitherButton>
          <EitherButton onClick={onClickPosting}>진행중</EitherButton>
          <EitherButton onClick={onClickCompletePost}>종료됨</EitherButton>
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
