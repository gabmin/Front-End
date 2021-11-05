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
  const userInfo = useSelector(state => state.user.userInfo);

  const cardList = multiPost && multiPost.multi;
  const ingCardList = multiPosting && multiPosting.multi;
  const completeCardList = multiPostComplete && multiPostComplete.multi;
  console.log("멀티포스트", cardList);

  const [select, setSelect] = useState("checkMulti");
  const [status, setStatus] = useState("Post");

  useEffect(() => {
    dispatch(PostDB());
    setStatus("Post");
  }, [dispatch]);

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
    if (!userInfo.nickname) {
      window.alert("로그인 후 이용 가능합니다");
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
