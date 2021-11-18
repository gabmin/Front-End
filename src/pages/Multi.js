import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import MultiSlick from "../components/MultiSlick";
import { PostDB, PostingDB, PostCompleteDB } from "../redux/actions/multiCard";
import colors from "../shared/colors";
import { mobile } from "../shared/style";

const Multi = props => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState("checkMulti");
  const [status, setStatus] = useState("Post");
  const userInfo = useSelector(state => state.user.userInfo);
  const paramsId = useSelector(state => state.params.paramsId);
  const { multiPost, multiPosting, multiPostComplete } = useSelector(
    state => state.multiCard,
  );

  const cardList = multiPost && multiPost.multi;
  const ingCardList = multiPosting && multiPosting.multi;
  const completeCardList = multiPostComplete && multiPostComplete.multi;

  useEffect(() => {
    dispatch(PostDB(paramsId));
    setStatus("Post");
  }, [dispatch, paramsId]);

  const showPost = () => {
    dispatch(PostDB(paramsId));
    setStatus("Post");
  };
  const showPosting = () => {
    dispatch(PostingDB(paramsId));
    setStatus("Posting");
  };
  const showCompletePost = () => {
    dispatch(PostCompleteDB(paramsId));
    setStatus("CompletePost");
  };

  const goToWrite = () => {
    if (!userInfo.nickname) {
      window.alert("로그인 후 이용 가능합니다");
      history.push("/login");
    } else {
      history.push("/write");
    }
  };
  return (
    <Container>
      <TabBtnWarpper>
        {status === "Post" ? (
          <TabBtnOn onClick={showPost}>전체</TabBtnOn>
        ) : (
          <TabBtn onClick={showPost}>전체</TabBtn>
        )}
        {status === "Posting" ? (
          <TabBtnOn onClick={showPosting}>진행중</TabBtnOn>
        ) : (
          <TabBtn onClick={showPosting}>진행중</TabBtn>
        )}
        {status === "CompletePost" ? (
          <TabBtnOn onClick={showCompletePost}>종료됨</TabBtnOn>
        ) : (
          <TabBtn onClick={showCompletePost}>종료됨</TabBtn>
        )}
      </TabBtnWarpper>
      <SliderWarpper>
        {status === "Post" ? <MultiSlick cardList={cardList} /> : null}
        {status === "Posting" ? <MultiSlick cardList={ingCardList} /> : null}
        {status === "CompletePost" ? (
          <MultiSlick cardList={completeCardList} />
        ) : null}
      </SliderWarpper>
      <QuestionBtnWarpper>
        <QuestionBtn onClick={goToWrite}>질문하기</QuestionBtn>
      </QuestionBtnWarpper>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1280px;
  margin: auto;
  height: 100%;
  @media screen and (max-width: ${mobile}) {
    max-width: 768px;
  }
`;

const TabBtnWarpper = styled.div`
  margin: 51px auto 0px auto;
  width: 100%;
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

const TabBtn = styled.button`
  border: none;
  background-color: ${colors.white};
  font-size: 20px;
  font-weight: bold;
  color: ${colors.gray5};
  line-height: 29px;
  cursor: pointer;
  &:hover {
    color: ${colors.blue};
    text-decoration: underline;
    text-underline-position: under;
  }
  @media screen and (max-width: ${mobile}) {
    font-size: 17px;
  }
`;

const TabBtnOn = styled.button`
  border: none;
  background-color: ${colors.white};
  font-size: 20px;
  font-weight: bold;
  line-height: 29px;
  cursor: pointer;
  color: ${colors.blue};
  text-decoration: underline;
  text-underline-position: under;
  @media screen and (max-width: ${mobile}) {
    font-size: 17px;
  }
`;

const SliderWarpper = styled.div`
  margin: 0px auto;
  width: 100%;
  height: 100%;
`;

const QuestionBtnWarpper = styled.div`
  margin: 0 auto;
  width: 100%;
  text-align: center;
`;

const QuestionBtn = styled.button`
  border: 1px ${colors.red} solid;
  border-radius: 8px;
  width: 180px;
  height: 40px;
  color: ${colors.red};
  background-color: ${colors.white};
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.red};
    color: ${colors.white};
  }
  @media screen and (max-width: ${mobile}) {
    transform: scale(0.9);
  }
`;

export default Multi;
