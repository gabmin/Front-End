import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";

import { history } from "../redux/configureStore";
import { SetParams } from "../redux/reducers/paramsSlice";
import { loginCheck, logout } from "../redux/actions/user";

import { ReactComponent as Logo } from "../images/logo.svg";
import { ReactComponent as Symbol } from "../images/symbolRed.svg";
import { ReactComponent as chevronDown } from "../images/chevronDown.svg";
import { ReactComponent as CommonIcon } from "../images/CommonIcon.svg";
import { blue, red, mobile, tablet } from "../shared/style";

const Header = () => {
  const dispatch = useDispatch();
  const { nickname = "GUEST", userId = "" } = useSelector(
    state => state.user.userInfo,
  );
  const { loginCheckDone } = useSelector(state => state.user);

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
        <MenuWrapper>
          <StyledSymbol onClick={onClickSimbol} />
          <span onClick={onClickEither}>찬반</span>
          <span onClick={onClickMulti}>객관식</span>
        </MenuWrapper>
        <Wrapper>
          <StyledSearch onClick={submitSearch} />
          <input
            placeholder="검색..."
            onKeyPress={submitSearch}
            onChange={onChangeSearch}
            value={search}
          />
        </Wrapper>
        {loginCheckDone ? (
          <IconWrapper loggedIn={nickname !== "GUEST"}>
            {nickname === "GUEST" && (
              <span onClick={onClickLogin} className="loginBtn">
                로그인
              </span>
            )}
            {nickname !== "GUEST" && (
              <>
                <Menu
                  menuButton={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <StyledCommonIcon />
                      <span>{nickname}</span>
                      <StyledDown />
                    </div>
                  }
                >
                  <MenuItem onClick={onClickNickname}>프로필 페이지</MenuItem>
                  <MenuItem onClick={onClickLogout}>로그아웃</MenuItem>
                </Menu>
              </>
            )}
          </IconWrapper>
        ) : (
          <MenuLoading></MenuLoading>
        )}
      </Bottom>
    </Container>
  );
};

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
  max-width: 1280px;
  width: 90%;
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

  /* @media screen and (max-width: ${mobile}) {
    display: none;
  } */
`;

const Wrapper = styled.div`
  display: flex;
  width: 30%;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: ${mobile}) {
    display: none;
  }
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
  margin-right: 30px;
  @media screen and (max-width: ${mobile}) {
    display: none;
  }
`;

const StyledDown = styled(chevronDown)`
  position: relative;
  top: 1px;
  width: 24px;
  height: 20px;
  cursor: pointer;
`;

const StyledCommonIcon = styled(CommonIcon)`
  width: 40px;
  height: 40px;
  margin-right: 12px;
  cursor: pointer;
`;

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  width: 30%;
  height: 100%;

  span {
    margin: 0 30px;
    color: #e25b45;
    text-align: center;
  }

  @media screen and (max-width: ${tablet}) {
    width: 40%;
    span {
      margin: 0 10px;
    }
  }

  @media screen and (max-width: ${mobile}) {
    width: 60%;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  right: ${props => (props.loggedIn ? 0 : "45px")};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  width: 30%;
  height: 100%;

  span {
    margin: 0;
    color: #e25b45;
    text-align: center;
  }

  .loginBtn {
    color: white;
    position: relative;
    left: 40px;
    width: 70px;
    background-color: #e25b45;
    padding: 5px;
    border-radius: 7px;
    box-sizing: border-box;
  }

  @media screen and (max-width: ${mobile}) {
    width: 40%;
  }
`;

const MenuLoading = styled.div`
  width: 30%;
`;

export default Header;
