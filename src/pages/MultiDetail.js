import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

import MultiComment from "../components/MultiComment";
import MultiUnvoted from "../components/MultiUnvoted";
import MultiVoted from "../components/MultiVoted";
import { ClosePostDB, DeletePostDB } from "../redux/actions/multiCard";
import { DetailDB } from "../redux/actions/multiDetail";
import styled from "styled-components";

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
  }, [dispatch, multiId]);

  const deletePost = () => {
    if (TotalCnt === 0) {
      dispatch(DeletePostDB(multiId));
    } else {
      window.alert("투표가 진행된 게시물은 삭제할 수 없습니다");
      return;
    }
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
      </Container>
    );
  } else {
    return (
      <Container>
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
      </Container>
    );
  }
  return null;
};

const Container = styled.div`
  max-width: 60%;
  margin: auto;
`;

export default MultiDetail;
