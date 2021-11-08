import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { FiArrowLeft } from "react-icons/fi";

import colors from "../shared/colors";
import MultiComment from "../components/MultiComment";
import MultiUnvoted from "../components/MultiUnvoted";
import MultiVoted from "../components/MultiVoted";
import { ClosePostDB, DeletePostDB } from "../redux/actions/multiCard";
import { DetailDB } from "../redux/actions/multiDetail";
import styled from "styled-components";
import { SetParams } from "../redux/reducers/paramsSlice";

const MultiDetail = props => {
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const multiId = props.match.params.multi_id;
  const multiDetail = useSelector(state => state.multiDetail.multiDetail);
  console.log("multiDetail", multiDetail);
  const userInfo = useSelector(state => state.user.userInfo);
  const dataList = multiDetail.multi && multiDetail;
  console.log("dataListList", dataList);

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

  const deletePost = () => {
    if (TotalCnt === 0) {
      dispatch(DeletePostDB(multiId));
    } else {
      window.alert("투표가 진행된 게시물은 삭제할 수 없습니다");
      return;
    }
  };

  const goToMulti = () => {
    history.push({
      pathname: "/multi",
      state: { multiId: multiId },
    });
  };

  const closePost = () => {
    dispatch(ClosePostDB(multiId));
  };

  const editPost = () => {
    if (TotalCnt === 0) {
      history.push(`/multi/${multiId}/edit`);
    } else {
      window.alert("투표가 진행된 게시물은 수정할 수 없습니다");
      return;
    }
  };

  if (dataList && !userInfo.nickname) {
    window.alert("로그인 후 이용가능합니다");
    history.push("/login");
  } else if (
    dataList &&
    (userInfo.nickname === dataList.multi.nickname ||
      dataList.multi.voted !== null)
  ) {
    return (
      <Container>
        <BackBtn onClick={goToMulti}>
          <FiArrowLeft />
          뒤로가기
        </BackBtn>
        <Wrapper>
          <div>
            <MultiVoted multiId={multiId} dataList={dataList} />
          </div>
          {userInfo.nickname === dataList.multi.nickname ? (
            <div>
              {/* <div>투표가 종료되었습니다</div> */}
              <div>
                <button onClick={deletePost}>삭제하기</button>
                {dataList.multi.completed !== 1 ? (
                  <div>
                    <button onClick={editPost}>수정하기</button>
                    <button onClick={closePost}>종료하기</button>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          <div>
            <MultiComment multiId={multiId} />
          </div>
        </Wrapper>
      </Container>
    );
  } else {
    return (
      <Container>
        <BackBtn onClick={goToMulti}>
          <FiArrowLeft />
          뒤로가기
        </BackBtn>
        <Wrapper>
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
      </Container>
    );
  }
  return null;
};

const Container = styled.div`
  max-width: 60%;
  margin: auto;
`;

const BackBtn = styled.button`
  border: none;
  background-color: ${colors.white};
`;

const Wrapper = styled.div`
  width: 800px;
  margin: 64px auto;
  border: 2px ${colors.blue} solid;
  border-radius: 10px;
`;

export default MultiDetail;
