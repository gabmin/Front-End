import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";
import { loginUser, logoutUser } from "../redux/reducers/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);

  useEffect(() => {
    dispatch(loginUser());
  }, [dispatch]);

  const onClickLogin = useCallback(() => {
    history.push("/login");
  }, []);

  const onClickLogo = useCallback(() => {
    history.push("/");
  }, []);

  const onClickLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <Container>
      <Logo onClick={onClickLogo}>
        개<span>미들의</span>곡소리
      </Logo>
      <Menu>
        <span>찬반</span>
        <span>객관식</span>
        {userInfo ? (
          <>
            <span>{userInfo}</span>
            <span onClick={onClickLogout}>로그아웃</span>
          </>
        ) : (
          <span onClick={onClickLogin}>로그인</span>
        )}
      </Menu>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100px;
  border-bottom: 3px solid lightgray;

  span {
    cursor: pointer;
    user-select: none;
  }
`;

const Logo = styled.div`
  font-size: 3em;
  cursor: pointer;
  user-select: none;

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

export default Header;
