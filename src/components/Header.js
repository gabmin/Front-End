import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { history } from "../redux/configureStore";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100px;
  border-bottom: 3px solid lightgray;
`;

const Logo = styled.div`
  font-size: 3em;

  span {
    font-size: 0.2em;
  }
`;

const Menu = styled.div`
  font-size: 1em;

  span {
    margin: 0 1em;
  }
`;

const Header = () => {
  // const userInfo = useSelector(state => state.user.userInfo);
  const userInfo = null;

  const onClickLogin = useCallback(() => {
    history.push("/login");
  }, []);

  return (
    <Container>
      <Logo>
        개<span>미들의</span>곡소리
      </Logo>
      <Menu>
        <span>찬반</span>
        <span>객관식</span>
        {userInfo ? (
          <span>{userInfo}</span>
        ) : (
          <span onClick={onClickLogin}>로그인</span>
        )}
      </Menu>
    </Container>
  );
};

export default Header;
