import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import MaterialIcon from "material-icons-react";

import colors from "../shared/colors";
import MultiComment from "../components/MultiComment";
import MultiUnvoted from "../components/MultiUnvoted";
import MultiVoted from "../components/MultiVoted";
import LoadingBubble from "../elements/LoadingBubble";
import { mobile } from "../shared/style";
import { ClosePostDB, DeletePostDB } from "../redux/actions/multiCard";
import { DetailDB } from "../redux/actions/multiDetail";
import { SetParams } from "../redux/reducers/paramsSlice";

const CompletedDetail = props => {
  const dispatch = useDispatch();
  const multiId = props.multiId;
  const multiDetail = useSelector(state => state.multiDetail.multiDetail);
  const dataList = multiDetail.multi && multiDetail;
  const { DetailDBDone, DetailDBLoading } = useSelector(
    state => state.multiDetail,
  );

  useEffect(() => {
    dispatch(DetailDB(multiId));
    dispatch(SetParams(multiId));
  }, [dispatch, multiId]);

  const goToMulti = () => {
    history.push({
      pathname: "/multi",
      state: { multiId: multiId },
    });
  };

  return (
    <>
      <Container>
        {DetailDBLoading === true && <LoadingBubble />}
        {DetailDBDone === true && (
          <Wrapper>
            <MenuWarpper>
              <BackBtn onClick={goToMulti}>
                <FiArrowLeft />
              </BackBtn>
            </MenuWarpper>
            <DisabledComment>투표가 종료된 게시물 입니다</DisabledComment>
            <div>
              <MultiVoted multiId={multiId} dataList={dataList} />
            </div>

            <div>
              <MultiComment multiId={multiId} />
            </div>
          </Wrapper>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  min-width: 100%;
  max-width: 1100px;
  min-height: 100%;
  margin: 10px auto 50px auto;
  box-sizing: border-box;
  @media screen and (max-width: ${mobile}) {
    padding: 10px;
  }
`;

const BackBtn = styled.button`
  margin: 10px auto 0 10px;
  border: none;
  font-size: 24px;
  font-family: "Noto Sans KR", sans-serif;
  color: ${colors.gray5};
  background-color: ${colors.white};
`;

const Wrapper = styled.div`
  /* min-width: 80%; */
  max-width: 840px;
  margin: auto;
  border: 2px ${colors.blue} solid;
  border-radius: 10px;
`;

const MenuWarpper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DisabledComment = styled.p`
  text-align: center;
  color: ${colors.darkGray};
  font-size: 14px;
`;

export default CompletedDetail;
