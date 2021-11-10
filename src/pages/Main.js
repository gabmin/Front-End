import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import MainSlick from "../components/MainSlick";
import { getMainData } from "../redux/actions/main";
import { history } from "../redux/configureStore";

import { ReactComponent as GoAnt } from "../images/mainAnt.svg";
import { blue, red, mobile, tablet } from "../shared/style";

const Main = () => {
  const dispatch = useDispatch();

  const { either, multi, attendNum, postingNum } = useSelector(
    state => state.main.mainPosts,
  );

  const { mainDataDone } = useSelector(state => state.main);

  const { nickname } = useSelector(state => state.user.userInfo);

  useEffect(() => {
    dispatch(getMainData());
  }, [dispatch]);

  const goToWrite = select => {
    if (nickname === "GUEST") {
      alert("로그인 후 가능합니다.");
      history.push("/login");
    } else {
      history.push({
        pathname: "/write",
        state: { select: select },
      });
    }
  };

  const onClickTop = useCallback(() => {
    window.scroll(0, 0);
  }, []);

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
        <GoEither
          onClick={() => {
            goToWrite("checkEither");
          }}
        >
          <h3> {attendNum}마리의 개미들이 참여 중입니다!</h3>
          <h1> 찬반 질문 작성하기</h1>
          <StyledGoAnt color="blue" />
        </GoEither>
        <GoMulti
          onClick={() => {
            goToWrite("checkMulti");
          }}
        >
          <h3> {attendNum}마리의 개미들이 참여 중입니다!</h3>
          <h1> 객관식 질문 작성하기</h1>
          <StyledGoAnt color="white" />
        </GoMulti>
      </Notice>
      <Wrapper height="230px">
        {mainDataDone === true && (
          <MainSlick cardList={either} type="either"></MainSlick>
        )}
      </Wrapper>
      <Wrapper height="500px">
        {mainDataDone === true && (
          <MainSlick cardList={multi} type="multi"></MainSlick>
        )}
      </Wrapper>
      <Counts>
        <div className="countsWrapper">
          <p className="countNum">{postingNum}</p>
          <p className="countType">고민</p>
        </div>
        <div className="betweenLine"></div>
        <div className="countsWrapper">
          <p className="countNum">{attendNum}</p>
          <p className="countType">참여</p>
        </div>
      </Counts>
      <Top onClick={onClickTop}>TOP</Top>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 67%;
  max-width: 1280px;
  height: 1170px;
  margin: auto;
  user-select: none;

  @media screen and (max-width: 1540px) {
    top: 50px;
    flex-direction: column;
    height: 1300px;
  }
`;

const Top = styled.div`
  position: absolute;
  bottom: 30px;
  right: -80px;
  font-size: 18px;
  font-weight: bold;
  color: ${blue};
  border-bottom: 1px solid ${blue};
  cursor: pointer;

  @media screen and (max-width: 1540px) {
    bottom: 100px;
    right: -40px;
  }
`;

const Notice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 250px;

  @media screen and (max-width: 1540px) {
    flex-direction: column;
  }
`;

const GoEither = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 620px;
  height: 120px;
  padding: 0 50px;
  justify-content: center;
  border: 2px solid ${blue};
  box-sizing: border-box;
  border-radius: 20px;
  cursor: pointer;

  @media screen and (max-width: 1540px) {
    width: 100%;
    padding: 0 10px;
  }

  h1 {
    margin: 5px 0 0;
    color: ${blue};
    font-size: 24px;
  }
  h3 {
    margin: 0;
    color: ${blue};
    font-size: 14px;
    font-weight: 500;
  }
`;

const GoMulti = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 620px;
  height: 120px;
  padding: 0 50px;
  background-color: ${blue};
  border-radius: 20px;
  box-sizing: border-box;
  cursor: pointer;

  h1 {
    margin: 5px 0 0;
    color: white;
    font-size: 24px;
  }
  h3 {
    margin: 0;
    color: white;
    font-size: 14px;
    font-weight: 500;
  }

  @media screen and (max-width: 1540px) {
    width: 100%;
    padding: 0 10px;

    h1 {
      font-size: 22px;
    }
  }
`;

const StyledGoAnt = styled(GoAnt)`
  position: absolute;
  bottom: ${props => (props.color === "blue" ? "0" : "2px")};
  right: ${props => (props.color === "blue" ? "0" : "2px")};
  border-radius: ${props =>
    props.color === "blue" ? "0 0 12px 0" : "0 0 17px 0"};
  fill: ${props => (props.color === "blue" ? blue : "#ffffff")};
  stroke: ${props => (props.color === "blue" ? blue : "#ffffff")};

  @media screen and (max-width: ${mobile}) {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: ${props => (props.justify ? props.justify : "center")};
  width: 100%;
  height: ${props => props.height};
  margin: 10px 0 80px;

  @media screen and (max-width: 1540px) {
    margin-top: 50px;
  }
`;

const Counts = styled.div`
  position: relative;
  bottom: 50px;
  display: flex;
  flex-direction: row;
  width: 50%;
  justify-content: space-between;

  .countsWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .betweenLine {
    content: "";
    width: 1px;
    height: 100%;
    background-color: lightgray;
  }

  p {
    margin: 3px 0;
  }

  .countNum {
    font-size: 20px;
    color: ${red};
    font-weight: bold;
  }

  .countType {
    font-size: 12px;
    font-weight: bold;
  }
`;

export default Main;
