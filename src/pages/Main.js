import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  height: 1000px;
  background-color: royalblue;
  margin: auto;
`;

const Notice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 300px;
  background-color: wheat;
  h1,
  h3 {
    margin: 10px 100px;
  }
`;

const CountWrapper = styled.div``;

const SlickWrapper = styled.div`
  width: 80%;
  height: 300px;
  background-color: gray;
`;

const Main = props => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Notice>
        <h1>개미들의 곡소리</h1>
        <h3>고민을 올려보세요</h3>
      </Notice>
      <SlickWrapper></SlickWrapper>
    </Container>
  );
};

export default Main;
