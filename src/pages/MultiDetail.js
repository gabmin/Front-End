import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { FiArrowLeft, FiMoreHorizontal } from "react-icons/fi";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import colors from "../shared/colors";
import MultiComment from "../components/MultiComment";
import MultiUnvoted from "../components/MultiUnvoted";
import MultiVoted from "../components/MultiVoted";
import CompletedDetail from "../components/CompletedDetail";
import { mobile } from "../shared/style";
import LoadingBubble from "../elements/LoadingBubble";
import { ClosePostDB, DeletePostDB } from "../redux/actions/multiCard";
import { DetailDB } from "../redux/actions/multiDetail";
import { SetParams } from "../redux/reducers/paramsSlice";
import MultiMenu from "../elements/MultiMenu";
import { useLocation } from "react-router";

const MultiDetail = props => {
  const dispatch = useDispatch();
  const location = useLocation();
  const multiDetail = useSelector(state => state.multiDetail.multiDetail);
  const userNickname = localStorage.getItem("nickname");
  const multiId = props.match.params.multi_id;
  const dataList = multiDetail.multi && multiDetail;

  const { DeletePostDBDone, ClosePostDBDone } = useSelector(
    state => state.multiCard,
  );
  const { DetailDBDone, DetailDBLoading } = useSelector(
    state => state.multiDetail,
  );
  const onComment = location.state?.onComment;
  const commentRef = useRef();

  // console.log("onComment", commentRef);
  // const [deleteAction, setDeleteAction] = useState(null);
  // const [closeAction, setCloseAction] = useState(null);

  // console.log("dataListList", dataList);
  // const [state, setState] = useState(false);

  // const render = temp => {
  //   setState(temp);
  // };
  // console.log("state", state);

  const TotalCnt =
    dataList &&
    dataList.multi.voteCntA +
      dataList.multi.voteCntB +
      dataList.multi.voteCntC +
      dataList.multi.voteCntD +
      dataList.multi.voteCntE;

  useEffect(() => {
    dispatch(DetailDB(multiId));
    dispatch(SetParams(multiId));
    // if (onComment == "onComment") {
    //   console.log("aaa", commentRef);
    // }
  }, [dispatch, multiId, onComment]);

  const goToMulti = () => {
    history.push("/multi");
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // useEffect(() => {
  //   if (deleteAction && DeletePostDBDone) {
  //     // window.alert("삭제가 완료되었습니다.");
  //     history.replace("/multi");
  //   }
  // }, [DeletePostDBDone, deleteAction]);

  // useEffect(() => {
  //   if (closeAction && ClosePostDBDone) {
  //     // window.alert("삭제가 완료되었습니다.");
  //     history.replace("/multi");
  //   }
  // }, [ClosePostDBDone, closeAction]);

  // const deletePost = () => {
  //   const deleteConfirm = window.confirm("투표를 삭제하시겠습니까?");
  //   if (TotalCnt === 0 && deleteConfirm == true) {
  //     dispatch(SetParams("all"));
  //     dispatch(DeletePostDB(multiId));
  //     setDeleteAction(true);
  //     // window.location.replace("/multi");
  //   } else if (deleteConfirm == false) {
  //     return;
  //   } else {
  //     window.alert("투표가 진행된 게시물은 삭제할 수 없습니다");
  //     return;
  //   }
  // };

  // const closePost = () => {
  //   const closeVote = window.confirm("투표를 종료하시겠습니까?");
  //   if (closeVote == true) {
  //     dispatch(ClosePostDB(multiId));
  //     // dispatch(SetParams(multiId));
  //     // history.push("/multi");
  //     setCloseAction(true);
  //   }
  //   return;
  // };

  // const editPost = () => {
  //   if (TotalCnt === 0) {
  //     history.push(`/multi/${multiId}/edit`);
  //   } else {
  //     window.alert("투표가 진행된 게시물은 수정할 수 없습니다");
  //     return;
  //   }
  // };

  if (userNickname === "GUEST") {
    window.alert("로그인 후 이용가능합니다");
    history.replace("/login");
  } else if (dataList && dataList.multi.completed === 1) {
    return (
      <div>
        <CompletedDetail multiId={multiId} TotalCnt={TotalCnt} />{" "}
        {/* <TopBtn onClick={goToTop}>TOP</TopBtn> */}
      </div>
    );
  } else if (
    dataList &&
    // (userNickname === dataList.multi.nickname || dataList.multi.voted !== null)
    dataList.multi.voted !== null
  ) {
    return (
      <Container>
        {DetailDBLoading === true && <LoadingBubble />}
        {DetailDBDone === true && (
          <Wrapper>
            <MenuWarpper>
              <BackBtn data-testid="backBtn" onClick={goToMulti}>
                <FiArrowLeft />
              </BackBtn>

              {userNickname === dataList.multi.nickname ? (
                <MultiMenu multiId={multiId} TotalCnt={TotalCnt} />
              ) : null}
            </MenuWarpper>
            <div>
              {DetailDBLoading === true && <LoadingBubble />}
              {DetailDBDone === true && (
                <MultiVoted multiId={multiId} dataList={dataList} />
              )}
            </div>

            <div ref={commentRef}>
              {DetailDBDone === true && <MultiComment multiId={multiId} />}
            </div>
          </Wrapper>
        )}
        {/* <TopBtn onClick={goToTop}>TOP</TopBtn> */}
      </Container>
    );
  } else {
    return (
      <Container>
        {DetailDBLoading === true && <LoadingBubble />}
        {DetailDBDone === true && (
          <Wrapper>
            <MenuWarpper>
              <BackBtn data-testid="backBtn" onClick={goToMulti}>
                <FiArrowLeft />
              </BackBtn>

              {userNickname === dataList.multi.nickname ? (
                <MultiMenu multiId={multiId} TotalCnt={TotalCnt} />
              ) : null}
            </MenuWarpper>
            {/* {DetailDBDone === true && ( */}
            <MultiUnvoted multiId={multiId} dataList={dataList} />
            {/* {DetailDBDone === true && ( */}
            <div>
              <MultiComment multiId={multiId} />
            </div>
          </Wrapper>
        )}
        {/* <TopBtn onClick={goToTop}>TOP</TopBtn> */}
      </Container>
    );
  }
  return <LoadingBubble />;
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

const Temp = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.1;
  z-index: 50;
  position: absolute;
`;

const BackBtn = styled.button`
  margin: 10px auto 0 10px;
  border: none;
  font-size: 24px;
  font-weight: 400;
  font-family: "Noto Sans KR", sans-serif;
  color: ${colors.gray4};
  background-color: ${colors.white};
  cursor: pointer;
`;

const Wrapper = styled.div`
  /* min-width: 80%; */
  max-width: 840px;
  margin: auto;
  border: 2px ${colors.blue} solid;
  border-radius: 10px;
  background-color: ${colors.white};
`;

const MenuBar = styled.div`
  margin: 10px 10px 0 auto;
`;

const MenuWarpper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TopBtn = styled.button`
  display: block;
  margin: 5% 8% 20px auto;
  font-weight: 700;
  font-family: "Noto Sans KR", sans-serif;
  border: none;
  background-color: transparent;
  color: ${colors.blue};
  cursor: pointer;
  text-decoration: underline;
  text-underline-position: under;
`;

const Top = styled.div`
  position: absolute;
  bottom: 30px;
  right: -80px;
  font-size: 18px;
  font-weight: bold;
  color: ${colors.blue};
  border-bottom: 1px solid ${colors.blue};
  cursor: pointer;

  @media screen and (max-width: 1540px) {
    bottom: 100px;
    right: -40px;
  }
`;

export default MultiDetail;
