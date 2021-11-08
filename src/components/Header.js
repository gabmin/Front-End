import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

import { history } from "../redux/configureStore";
import { SetParams } from "../redux/reducers/paramsSlice";
import { loginCheck, logout } from "../redux/actions/user";
import { ReactComponent as Logo } from "../images/logo.svg";
import { ReactComponent as Symbol } from "../images/symbolRed.svg";

const Header = () => {
  const dispatch = useDispatch();
  const { nickname = "", userId = "" } = useSelector(
    state => state.user.userInfo,
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(loginCheck());
  }, [dispatch]);

  const onClickLogin = useCallback(() => {
    history.push("/login");
  }, []);

  const onClickSimbol = useCallback(() => {
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
      if (e.key === "Enter" || e.type === "click") {
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
    dispatch(SetParams());
    history.push(`/either`);
  }, [dispatch]);

  const onClickMulti = useCallback(() => {
    dispatch(SetParams());
    history.push(`/multi`);
  }, [dispatch]);

  return (
    <Container>
      <Top>
        <Logo
          height="26px"
          fill="white"
          onClick={onClickSimbol}
          cursor="pointer"
        />
      </Top>
      <Bottom>
        <Wrapper>
          <StyledSymbol onClick={onClickSimbol} />
        </Wrapper>
        <Wrapper>
          <StyledSearch onClick={submitSearch} />
          <input
            placeholder="검색..."
            onKeyPress={submitSearch}
            onChange={onChangeSearch}
            value={search}
          />
        </Wrapper>
        <Menu>
          <span onClick={onClickEither}>찬반</span>
          <span onClick={onClickMulti}>객관식</span>
          {nickname ? (
            <>
              <span onClick={onClickNickname}>{nickname}</span>
              <span onClick={onClickLogout}>로그아웃</span>
            </>
          ) : (
            <span onClick={onClickLogin} className="loginBtn">
              로그인
            </span>
          )}
        </Menu>
      </Bottom>
    </Container>
  );
};

const blue = "#00397c";
const red = "#E25B45";
const tablet = "1300px";
const mobile = "768px";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 120px;
  border-bottom: 1px solid ${red};

  span {
    cursor: pointer;
    user-select: none;
  }
`;

const Top = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  background-color: #00397c;
  align-items: center;
  justify-content: center;
`;

const Bottom = styled.div`
  display: flex;
  position: relative;
  width: 67%;
  height: 64px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  input {
    width: 400px;
    height: 32px;
    padding-left: 32px;
    border: 1px solid #e25b45;
    border-radius: 9px;
  }

  @media screen and (max-width: ${tablet}) {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 30%;
  flex-direction: row;
  align-items: center;
`;

const StyledSearch = styled(FiSearch)`
  position: relative;
  left: 27px;
  min-width: 16px;
  min-height: 16px;
  color: #e25b45;
  cursor: pointer;
`;

const StyledSymbol = styled(Symbol)`
  cursor: pointer;
  user-select: none;
  height: 37px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  width: 30%;
  height: 100%;

  span {
    width: 100px;
    margin: 0;
    color: #e25b45;
    text-align: center;
  }

  .loginBtn {
    color: white;
    position: relative;
    left: 40px;
    width: 60px;
    background-color: #e25b45;
    padding: 5px;
    border-radius: 7px;
    box-sizing: border-box;
  }

  @media screen and (max-width: ${tablet}) {
    display: none;
  }
`;

export default Header;
