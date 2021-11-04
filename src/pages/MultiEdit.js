import React, { useCallback, useState } from "react";
import { history } from "../redux/configureStore";
import styled from "styled-components";

import MultiWrite from "../components/MultiWrite";
import { useSelector } from "react-redux";

const MultiEdit = props => {
  const [eitherState, setEitherState] = useState(false);
  const [multiState, setMultiState] = useState(true);
  const multiId = props.match.params.multi_id;
  const multiDetail = useSelector(state => state.multiDetail.multiDetail);
  console.log("multiDetail", multiDetail);
  const userInfo = useSelector(state => state.user.userInfo);
  const dataList = multiDetail.multi && multiDetail;
  console.log("dataListList", dataList);

  const editData = dataList && dataList.multi;
  console.log("editData", editData);

  //뒤로가기
  const onClickBack = useCallback(() => {
    history.push("/either");
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

  return (
    <>
      <Wrap>
        <ButtonGrid>
          <button onClick={onClickBack}>{"<"} 뒤로가기</button>
          <button onClick={onClickIndex}>목록</button>
        </ButtonGrid>
        <ContentBox>
          <Index>
            <h4 style={{ width: "30px" }}>구분</h4>
            <div style={{ display: "flex" }}>
              <RadioBtnWarpper>
                <input
                  name="write"
                  type="radio"
                  id="either"
                  checked={eitherState}
                  onChange={EitherRadioBtn}
                />
                <label>찬반</label>
              </RadioBtnWarpper>
              <RadioBtnWarpper>
                <input
                  name="write"
                  type="radio"
                  id="multi"
                  checked={multiState}
                  onChange={MultiRadioBtn}
                />
                <label>객관식</label>
              </RadioBtnWarpper>
            </div>
          </Index>

          {multiState ? (
            <MultiWrite editData={editData} multiId={multiId} />
          ) : null}
        </ContentBox>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 80%;
  height: 100%;
  margin: 50px auto;
`;
const ButtonGrid = styled.div`
  width: 100%;
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
`;

const ContentBox = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  padding: 1em;
  box-sizing: border-box;
`;
const RadioBtnWarpper = styled.div`
  width: 70px;
  display: flex;
  margin: 0px 0px 0px 60px;
  align-items: center;
`;

const Index = styled.div`
  margin: 10px;
  display: flex;
`;

export default MultiEdit;
