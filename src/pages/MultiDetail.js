import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { FiArrowLeft, FiMoreHorizontal } from "react-icons/fi";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import MaterialIcon from "material-icons-react";

import colors from "../shared/colors";
import MultiComment from "../components/MultiComment";
import MultiUnvoted from "../components/MultiUnvoted";
import MultiVoted from "../components/MultiVoted";
import { ClosePostDB, DeletePostDB } from "../redux/actions/multiCard";
import { DetailDB } from "../redux/actions/multiDetail";
import styled from "styled-components";
import { SetParams } from "../redux/reducers/paramsSlice";
import CompletedDetail from "../components/CompletedDetail";

const MultiDetail = props => {
  const dispatch = useDispatch();
  const multiId = props.match.params.multi_id;
  const multiDetail = useSelector(state => state.multiDetail.multiDetail);
  console.log("multiDetail", multiDetail);
  const userInfo = useSelector(state => state.user.userInfo);
  const dataList = multiDetail.multi && multiDetail;
  console.log("dataListList", dataList);
  const [state, setState] = useState(false);

  const render = temp => {
    setState(temp);
  };
  console.log("state", state);

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
  }, [dispatch, multiId]);

  const goToMulti = () => {
    history.push("/multi");
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deletePost = () => {
    if (TotalCnt === 0) {
      dispatch(DeletePostDB(multiId));
    } else {
      window.alert("투표가 진행된 게시물은 삭제할 수 없습니다");
      return;
    }
  };

  const closePost = () => {
    const closeVote = window.confirm("투표를 종료하시겠습니까?");
    if (closeVote == true) {
      dispatch(ClosePostDB(multiId));
      dispatch(SetParams(multiId));
      history.push("/multi");
    }
    return;
  };

  const editPost = () => {
    if (TotalCnt === 0) {
      history.push(`/multi/${multiId}/edit`);
    } else {
      window.alert("투표가 진행된 게시물은 수정할 수 없습니다");
      return;
    }
  };

  if (userInfo.nickname === "GUEST") {
    window.alert("로그인 후 이용가능합니다");
    history.push("/login");
  } else if (dataList && dataList.multi.completed === 1) {
    return (
      <div>
        <CompletedDetail multiId={multiId} />{" "}
        <TopBtn onClick={goToTop}>TOP</TopBtn>
      </div>
    );
  } else if (
    dataList &&
    (userInfo.nickname === dataList.multi.nickname ||
      dataList.multi.voted !== null)
  ) {
    return (
      <Container>
        {/* {dataList.multi.completed === 0 ? <Temp>aaaaa</Temp> : null} */}
        <Wrapper>
          <MenuWarpper>
            <BackBtn onClick={goToMulti}>
              <FiArrowLeft />
            </BackBtn>

            {userInfo.nickname === dataList.multi.nickname ? (
              // <div>
              //   {/* <div>투표가 종료되었습니다</div> */}
              //   <div>
              //     <button onClick={deletePost}>삭제하기</button>
              //     {dataList.multi.completed !== 1 ? (
              //       <div>
              //         <button onClick={editPost}>수정하기</button>
              //         <button onClick={closePost}>종료하기</button>
              //       </div>
              //     ) : null}
              //   </div>
              // </div>
              <MenuBar>
                <Menu
                  menuButton={
                    <MenuButton
                      styles={{
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                    >
                      <FiMoreHorizontal size={20} />
                      {/* <MaterialIcon icon="more_horiz" size={32} /> */}
                    </MenuButton>
                  }
                  menuStyles={{ border: "0px solid" }}
                  portal={true}
                >
                  <MenuItem
                    styles={{
                      fontSize: "14px",
                    }}
                    onClick={editPost}
                  >
                    수정하기
                  </MenuItem>
                  <MenuItem
                    styles={{
                      fontSize: "14px",
                    }}
                    onClick={deletePost}
                  >
                    삭제하기
                  </MenuItem>
                  <MenuItem
                    styles={{
                      fontSize: "14px",
                    }}
                    onClick={closePost}
                  >
                    투표 종료하기
                  </MenuItem>
                </Menu>
              </MenuBar>
            ) : null}
          </MenuWarpper>
          <div>
            <MultiVoted multiId={multiId} dataList={dataList} />
          </div>

          <div>
            <MultiComment multiId={multiId} />
          </div>
        </Wrapper>
        <TopBtn onClick={goToTop}>TOP</TopBtn>
      </Container>
    );
  } else {
    return (
      <Container>
        <Wrapper>
          <BackBtn onClick={goToMulti}>
            <FiArrowLeft />
          </BackBtn>
          {dataList && (
            <MultiUnvoted
              multiId={multiId}
              dataList={dataList}
              render={p => render(p)}
            />
          )}

          {dataList && (
            <div>
              <MultiComment multiId={multiId} />
            </div>
          )}
        </Wrapper>
        <TopBtn onClick={goToTop}>TOP</TopBtn>
      </Container>
    );
  }
  return null;
};

const Container = styled.div`
  min-width: 100%;
  max-width: 1100px;
  min-height: 100%;
  margin: 10px auto 50px auto;
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
  margin: 0 10% 20px auto;
  border: none;
  background-color: ${colors.white};
  color: ${colors.blue};
  cursor: pointer;
  text-decoration: underline;
  text-underline-position: under;
`;

export default MultiDetail;
