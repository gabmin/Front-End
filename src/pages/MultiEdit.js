import React, { useCallback, useEffect, useState } from "react";
import { history } from "../redux/configureStore";
import styled from "styled-components";

import { mobile, tablet } from "../shared/style";
import MultiWrite from "../components/MultiWrite";
import { useDispatch, useSelector } from "react-redux";
import { DetailDB } from "../redux/actions/multiDetail";

const MultiEdit = props => {
  const dispatch = useDispatch();
  const [eitherState, setEitherState] = useState(false);
  const [multiState, setMultiState] = useState(true);

  const multiId = props.match.params.multi_id;
  const multiDetail = useSelector(state => state.multiDetail.multiDetail);
  const userNickname = localStorage.getItem("nickname");
  const dataList = multiDetail.multi && multiDetail;
  const editData = dataList && dataList.multi;

  useEffect(() => {
    dispatch(DetailDB(multiId));
  }, []);

  //뒤로가기
  const onClickBack = useCallback(() => {
    history.push("/multi");
  });
  //목록으로가기
  const onClickIndex = useCallback(() => {
    history.push("/");
  });

  // radio button
  const EitherRadioBtn = e => {
    setEitherState(!eitherState);
    setMultiState(!multiState);
  };
  const MultiRadioBtn = e => {
    setEitherState(!eitherState);
    setMultiState(!multiState);
  };

  if (userNickname === "GUEST") {
    window.alert("로그인 후 이용가능합니다");
    history.replace("/login");
  } else if (dataList) {
    return (
      <>
        <Wrap>
          <ContentBox>
            <Index>
              <p>구분</p>
              <div style={{ display: "flex" }}>
                <RadioBtnWarpperE>
                  <input
                    name="write"
                    type="radio"
                    id="either"
                    checked={eitherState}
                    onChange={EitherRadioBtn}
                    disabled
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

            {multiState ? (
              <MultiWrite editData={editData} multiId={multiId} />
            ) : null}
          </ContentBox>
        </Wrap>
      </>
    );
  }
  return null;
};

const Wrap = styled.div`
  max-width: 840px;
  width: 90%;
  margin: auto;
  min-height: 100vh;
  padding-bottom: 40px;
  @media screen and (max-width: ${mobile}) {
    padding-bottom: 60px;
  }
`;

const ContentBox = styled.div`
  border: 2px solid #00397c;
  max-width: 840px;
  box-sizing: border-box;
  margin: 56px auto;
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

export default MultiEdit;
