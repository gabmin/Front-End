import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router";

import { mobile, tablet } from "../shared/style";
import EitherWrite from "../components/EitherWrite";
import MultiWrite from "../components/MultiWrite";
import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";

const CardWrite = () => {
  const location = useLocation();
  const [eitherState, setEitherState] = useState(true);
  const [multiState, setMultiState] = useState(false);
  const userInfo = useSelector(state => state.user.userInfo);
  const checkRadio = location.state?.select;
  console.log("checkRadio", checkRadio);

  useEffect(() => {
    if (checkRadio === "checkMulti") {
      setEitherState(false);
      setMultiState(true);
    } else if (checkRadio === "checkEither") {
      setEitherState(true);
      setMultiState(false);
    } else if (checkRadio !== "checkMulti" && checkRadio !== "checkEither") {
      setEitherState(true);
      setMultiState(false);
    }
  }, []);

  // radio button
  const EitherRadioBtn = e => {
    setEitherState(!eitherState);
    setMultiState(!multiState);
  };
  const MultiRadioBtn = e => {
    setEitherState(!eitherState);
    setMultiState(!multiState);
  };
  if (userInfo.nickname === "GUEST") {
    window.alert("로그인 후 이용가능합니다");
    history.push("/login");
  }
  return (
    <>
      <Wrap>
        <ContentBox>
          <Index>
            <p>구분</p>
            <div>
              <RadioBtnWarpperE>
                <input
                  name="write"
                  type="radio"
                  id="either"
                  checked={eitherState}
                  onChange={EitherRadioBtn}
                  data-testid="radioBtn"
                />
                <label>찬반</label>
              </RadioBtnWarpperE>
              <RadioBtnWarpperM>
                <input
                  name="write"
                  type="radio"
                  id="multi"
                  checked={multiState}
                  onChange={MultiRadioBtn}
                />
                <label>객관식</label>
              </RadioBtnWarpperM>
            </div>
          </Index>
          {eitherState ? <EitherWrite /> : null}
          {multiState ? <MultiWrite /> : null}
        </ContentBox>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  max-width: 840px;
  width: 90%;
  margin: auto;
`;

const ContentBox = styled.div`
  border: 2px solid #00397c;
  max-width: 840px;
  box-sizing: border-box;
  margin: 56px auto 56px auto;
  border-radius: 10px;
  padding: 4% 110px 4% 110px;
  @media screen and (max-width: ${mobile}) {
    padding: 7%;
    margin: 10% auto;
  }
`;

const Index = styled.div`
  display: flex;
  p {
    font-size: 18px;
    color: #101214;
    font-weight: bold;
    line-height: 26px;
    margin: 0px;
    @media screen and (max-width: ${mobile}) {
      font-size: 16px;
    }
  }
  div {
    display: flex;
  }
  margin: 0px 0px 22px 0px;
  @media screen and (max-width: ${mobile}) {
    margin: 0px 0px 10px 0px;
  }
`;

const RadioBtnWarpperE = styled.div`
  display: flex;
  margin: 0px 0px 0px 76px;
  width: 100px;
  align-items: center;
  label {
    font-size: 16px;
    @media screen and (max-width: ${mobile}) {
      font-size: 14px;
      width: 40px;
    }
  }
  input {
    margin: 0px 8px 0px 0px;
  }
  @media screen and (max-width: ${mobile}) {
    margin: 0px 0px 0px 20%;
  }
`;

const RadioBtnWarpperM = styled.div`
  display: flex;
  margin: 0px 0px 0px 47px;
  width: 100px;
  align-items: center;
  label {
    font-size: 16px;
    @media screen and (max-width: ${mobile}) {
      font-size: 14px;
      width: 40px;
    }
  }
  input {
    margin: 0px 8px 0px 0px;
  }
  @media screen and (max-width: ${mobile}) {
    margin: 0px 0px 0px 20%;
  }
`;

export default CardWrite;
