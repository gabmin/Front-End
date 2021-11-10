import React, { useCallback, useEffect, useState } from "react";
import { history } from "../redux/configureStore";
import styled from "styled-components";

import MultiWrite from "../components/MultiWrite";
import { useDispatch, useSelector } from "react-redux";
import { DetailDB } from "../redux/actions/multiDetail";

const MultiEdit = props => {
  const dispatch = useDispatch();
  const [eitherState, setEitherState] = useState(false);
  const [multiState, setMultiState] = useState(true);

  const multiId = props.match.params.multi_id;
  const multiDetail = useSelector(state => state.multiDetail.multiDetail);
  const userInfo = useSelector(state => state.user.userInfo);

  console.log("multiDetail", multiDetail);
  const dataList = multiDetail.multi && multiDetail;
  console.log("dataListList", dataList);

  const editData = dataList && dataList.multi;
  console.log("editData", editData);

  useEffect(() => {});

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

  if (userInfo.nickname === "GUEST") {
    window.alert("로그인 후 이용가능합니다");
    history.push("/login");
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
  min-width: 100%;
  max-width: 840px;
  margin: auto;
`;
const ButtonGrid = styled.div`
  width: 100%;
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
`;

const ContentBox = styled.div`
  border: 2px solid #00397c;
  max-width: 840px;
  box-sizing: border-box;
  margin: 56px auto 56px auto;
  border-radius: 10px;
  padding: 4% 110px 4% 110px;
`;

const Index = styled.div`
  display: flex;
  p {
    font-size: 18px;
    color: #101214;
    font-weight: bold;
    line-height: 26px;
    margin: 0px;
  }
  margin: 0px 0px 22px 0px;
`;

const RadioBtnWarpperE = styled.div`
  display: flex;
  margin: 0px 0px 0px 76px;
  align-items: center;
  label {
    font-size: 16px;
  }
`;

const RadioBtnWarpperM = styled.div`
  display: flex;
  margin: 0px 0px 0px 47px;
  align-items: center;
  label {
    font-size: 16px;
  }
`;

export default MultiEdit;
