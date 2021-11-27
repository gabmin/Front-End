import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { SetParams } from "../redux/reducers/paramsSlice";
import MainSlick from "../components/MainSlick";
import { getMainData } from "../redux/actions/main";
import { history } from "../redux/configureStore";
import LoadingBubble from "../elements/LoadingBubble";
import MainBanner from "../components/MainBanner";
import { blue, red, mobile, tablet } from "../shared/style";

import { ReactComponent as GoAnt } from "../images/mainAnt.svg";

const Main = () => {
  const dispatch = useDispatch();

  const [loadDone, setLoadDone] = useState(false);

  const { either, multi, attendNum, postingNum, eitherNum, multiNum } =
    useSelector(state => state.main.mainPosts);
  const { mainDataLoading, mainDataDone } = useSelector(state => state.main);
  const { nickname } = useSelector(state => state.user.userInfo);

  useEffect(() => {
    if (mainDataDone) {
      setTimeout(() => {
        setLoadDone(true);
      }, 200);
    }
  }, [mainDataDone]);

  useEffect(() => {
    dispatch(getMainData());
    dispatch(SetParams("all"));
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

  return (
    <>
      <MainBanner />
      <Container>
        <Notice>
          <GoEither
            onClick={() => {
              goToWrite("checkEither");
            }}
            data-testid="goEitherBtn"
          >
            {mainDataLoading === true ? (
              <h3>들린다... &nbsp;&nbsp;&nbsp;개의 곡소리가.....</h3>
            ) : (
              <h3>들린다... {eitherNum}개의 곡소리가.....</h3>
            )}
            <h1> 찬반 질문 작성하기</h1>
            <StyledGoAnt color="blue" />
          </GoEither>
          <GoMulti
            onClick={() => {
              goToWrite("checkMulti");
            }}
            data-testid="goMultiBtn"
          >
            {mainDataLoading === true ? (
              <h3>들린다... &nbsp;&nbsp;&nbsp;개의 곡소리가.....</h3>
            ) : (
              <h3>들린다... {multiNum}개의 곡소리가.....</h3>
            )}
            <h1> 객관식 질문 작성하기</h1>
            <StyledGoAnt color="white" />
          </GoMulti>
        </Notice>
        <Wrapper height="230px">
          {loadDone !== true && <LoadingBubble position="absolute" />}
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
            <p className="countType">전체 곡소리 수</p>
          </div>
          <div className="betweenLine"></div>
          <div className="countsWrapper">
            <p className="countNum">{attendNum}</p>
            <p className="countType">참여한 개미 수</p>
          </div>
        </Counts>
        {/* <Top onClick={onClickTop}>TOP</Top> */}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 67%;
  max-width: 1280px;
  margin: auto;
  user-select: none;

  @media screen and (max-width: 1540px) {
    top: 20px;
    flex-direction: column;
    height: 1200px;
    width: 75%;
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
    right: -30px;
  }
`;

const Notice = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 200px;

  @media screen and (max-width: 1540px) {
    flex-direction: column;
    height: 300px;
  }

  @media screen and (max-width: ${mobile}) {
    height: 130px;
  }
`;

const GoEither = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 49%;
  max-width: 620px;
  height: 120px;
  padding: 0 50px;
  justify-content: center;
  border: 2px solid ${blue};
  background-color: white;
  box-sizing: border-box;
  border-radius: 20px;
  cursor: pointer;

  @media screen and (max-width: 1540px) {
    width: 100%;
    padding: 0 10px;
    max-width: 95%;
    margin-bottom: 10px;
  }

  h1 {
    margin: 5px 0 0;
    color: ${blue};
    font-size: 20px;
  }
  h3 {
    margin: 0;
    color: ${blue};
    font-size: 14px;
    font-weight: 500;
  }

  @media screen and (max-width: ${mobile}) {
    width: 100%;
    height: 60px;
    padding: 0 10px;
    border-radius: 10px;
  }
`;

const GoMulti = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 49%;
  max-width: 620px;
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
    max-width: 95%;
    h1 {
      font-size: 20px;
    }
  }

  @media screen and (max-width: ${mobile}) {
    width: 100%;
    height: 60px;
    padding: 0 10px;
    border-radius: 10px;
  }
`;

const StyledGoAnt = styled(GoAnt)`
  position: absolute;
  width: 258px;
  bottom: ${props => (props.color === "blue" ? "-1px" : "2px")};
  right: ${props => (props.color === "blue" ? "-1px" : "2px")};
  border-radius: ${props =>
    props.color === "blue" ? "0 0 15px 0" : "0 0 17px 0"};
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
    margin-top: 30px;
  }
`;

const Counts = styled.div`
  position: relative;
  bottom: 50px;
  display: flex;
  flex-direction: row;
  width: 50%;
  justify-content: space-between;

  @media screen and (max-width: ${mobile}) {
    width: 65%;
  }

  .countsWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: ${mobile}) {
      width: 200px;
    }
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
