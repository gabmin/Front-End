import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { loginUser } from "../redux/reducers/userSlice";
import { logout } from "../redux/actions/user";

const Header = () => {
  const dispatch = useDispatch();
  const { nickname = "", userId = "" } = useSelector(
    state => state.user.userInfo,
  );

  const [search, setSearch] = useState("");

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
    dispatch(logout());
  }, [dispatch]);

  const onChangeSearch = useCallback(e => {
    setSearch(e.target.value);
  }, []);

  const submitSearch = useCallback(
    e => {
      if (e.key === "Enter") {
        if (!search.trim()) {
          alert("검색어를 입력해 주세요");
          return;
        }
        history.push(`/search?search=${search}`);
        setSearch("");
      }
    },
    [search],
  );

  const onClickNickname = useCallback(() => {
    history.push(`/profile/${userId}`);
  }, [userId]);

  const onClickEither = useCallback(() => {
    history.push(`/either`);
  }, []);

  const onClickMulti = useCallback(() => {
    history.push(`/multi`);
  }, []);

  return (
    <Container>
      <Logo onClick={onClickLogo}>
        개<span>미들의</span>곡소리
      </Logo>
      <Menu>
        <input
          placeholder="검색어를 입력하세요"
          onKeyPress={submitSearch}
          onChange={onChangeSearch}
          value={search}
        />
        <span onClick={onClickEither}>찬반</span>
        <span onClick={onClickMulti}>객관식</span>
        {nickname ? (
          <>
            <span onClick={onClickNickname}>{nickname}</span>
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
