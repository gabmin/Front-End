import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import MultiSlick from "../components/MultiSlick";
import { PostDB, PostingDB, PostCompleteDB } from "../redux/actions/multiCard";

const Multi = props => {
  const dispatch = useDispatch();
  const { multiPost, multiPosting, multiPostComplete } = useSelector(
    state => state.multiCard,
  );

  const cardList = multiPost.multi;
  const ingCardList = multiPosting.multi;
  const completeCardList = multiPostComplete.multi;
  console.log("멀티포스트", cardList);
  // const cardList = [
  //   {
  //     multiId: "1111",
  //     title: "title",
  //     description: "description",
  //     user: "user",
  //     date: "date",
  //     editedDate: "editedDate",
  //     completed: false,
  //     likeCnt: "0",
  //     commentCnt: "0",
  //   },
  //   {
  //     multiId: "2222",
  //     title: "title1",
  //     description: "description1",
  //     user: "user1",
  //     date: "date1",
  //     editedDate: "editedDate1",
  //     completed: false,
  //     likeCnt: "1",
  //     commentCnt: "1",
  //   },
  //   {
  //     multiId: "3333",
  //     title: "title2",
  //     description: "description2",
  //     user: "user2",
  //     date: "date2",
  //     editedDate: "editedDate2",
  //     completed: false,
  //     likeCnt: "2",
  //     commentCnt: "2",
  //   },
  //   {
  //     multiId: "4444",
  //     title: "title3",
  //     description: "description3",
  //     user: "user3",
  //     date: "date3",
  //     editedDate: "editedDate3",
  //     completed: false,
  //     likeCnt: "3",
  //     commentCnt: "3",
  //   },
  // ];
  // const cardList = multiPost.multi;
  // console.log("카드리스트", cardList);
  const [status, setStatus] = useState("Post");

  useEffect(() => {
    dispatch(PostDB());
    setStatus("Post");
  }, []);

  const showPost = () => {
    dispatch(PostDB());
    setStatus("Post");
  };
  const showPosting = () => {
    dispatch(PostingDB());
    setStatus("Posting");
  };
  const showCompletePost = () => {
    dispatch(PostCompleteDB());
    setStatus("CompletePost");
  };

  const goToWrite = () => {
    history.push("/write");
  };
  return (
    <Container>
      <TabBtnWarpper>
        <TabBtn onClick={showPost}>전체</TabBtn>
        <TabBtn onClick={showPosting}>진행중</TabBtn>
        <TabBtn onClick={showCompletePost}>종료됨</TabBtn>
      </TabBtnWarpper>
      <SliderWarpper>
        {status === "Post" ? <MultiSlick cardList={cardList} /> : null}
        {status === "Posting" ? <MultiSlick cardList={ingCardList} /> : null}
        {status === "CompletePost" ? (
          <MultiSlick cardList={completeCardList} />
        ) : null}
      </SliderWarpper>
      <QuestionBtnWarpper>
        <QuestionBtn onClick={goToWrite}>나도질문하기</QuestionBtn>
      </QuestionBtnWarpper>
    </Container>
  );
};

const Container = styled.div`
  max-width: 100%;
`;

const TabBtnWarpper = styled.div`
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

const SliderWarpper = styled.div`
  margin: 100px auto;
  width: 100%;
  height: 100%;
`;

const QuestionBtnWarpper = styled.div`
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
