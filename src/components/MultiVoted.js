import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { AddLikeDB } from "../redux/actions/multiLike";

const MultiVoted = props => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);
  const DataList = props.dataList.multi;
  const multiId = props.multiId;
  const [likes, setLikes] = useState(DataList.likeCnt);

  const TotalCnt =
    DataList.voteCntA +
    DataList.voteCntB +
    DataList.voteCntC +
    DataList.voteCntD +
    DataList.voteCntE;

  const PerA = (DataList.voteCntA / TotalCnt) * 100;
  const PerB = (DataList.voteCntB / TotalCnt) * 100;
  const PerC = (DataList.voteCntC / TotalCnt) * 100;
  const PerD = (DataList.voteCntD / TotalCnt) * 100;
  const PerE = (DataList.voteCntE / TotalCnt) * 100;

  const [perA, setPerA] = useState(0);
  setTimeout(() => {
    if (isNaN(PerA)) {
      setPerA("0");
    } else {
      setPerA(PerA.toFixed(0));
    }
  }, 1000);

  const [perB, setPerB] = useState(0);
  setTimeout(() => {
    if (isNaN(PerB)) {
      setPerB("0");
    } else {
      setPerB(PerB.toFixed(0));
    }
  }, 1200);

  const [perC, setPerC] = useState(0);
  setTimeout(() => {
    if (isNaN(PerC)) {
      setPerC("0");
    } else {
      setPerC(PerC.toFixed(0));
    }
  }, 1400);

  const [perD, setPerD] = useState(0);
  setTimeout(() => {
    if (isNaN(PerD)) {
      setPerD("0");
    } else {
      setPerD(PerD.toFixed(0));
    }
  }, 1600);

  const [perE, setPerE] = useState(0);
  setTimeout(() => {
    if (isNaN(PerE)) {
      setPerE("0");
    } else {
      setPerE(PerE.toFixed(0));
    }
  }, 1800);

  const addLike = () => {
    if (DataList.liked === null) {
      dispatch(AddLikeDB(multiId));
      setLikes(DataList.likeCnt + 1);
    } else {
      return;
    }
  };

  return (
    <Container>
      <TitleWrapper>
        <p>{DataList.title}</p>
      </TitleWrapper>
      <hr></hr>
      <div>
        <p>
          {DataList.contentA} {perA}%
        </p>
        <StyledProgressBar
          labelSize="2px"
          height="40px"
          bgColor="#777777"
          borderRadius="8px"
          completed={perA}
          maxCompleted={100}
        />
      </div>
      <div>
        <p>
          {DataList.contentB} {perB}%
        </p>
        <StyledProgressBar
          labelSize="2px"
          height="40px"
          bgColor="#777777"
          borderRadius="8px"
          completed={perB}
          maxCompleted={100}
        />
      </div>
      {DataList.contentC !== null ? (
        <div>
          <p>
            {DataList.contentC} {perC}%
          </p>
          <StyledProgressBar
            labelSize="2px"
            height="40px"
            bgColor="#777777"
            borderRadius="8px"
            completed={perC}
            maxCompleted={100}
          />
        </div>
      ) : null}
      {DataList.contentD !== null ? (
        <div>
          <p>
            {DataList.contentD} {perD}%
          </p>
          <StyledProgressBar
            labelSize="2px"
            height="40px"
            bgColor="#777777"
            borderRadius="8px"
            completed={perD}
            maxCompleted={100}
          />
        </div>
      ) : null}
      {DataList.contentE !== null ? (
        <div>
          <p>
            {DataList.contentE} {perE}%
          </p>
          <StyledProgressBar
            labelSize="2px"
            height="40px"
            bgColor="#777777"
            borderRadius="8px"
            completed={perE}
            maxCompleted={100}
          />
        </div>
      ) : null}
      {/* {DataList.nickname === userInfo.nickname ? (
        <button>투표 종료</button>
      ) : null} */}
      <hr />
      <div>
        <p>작성자{DataList.nickname}</p>
        <p>{DataList.date}</p>
        <button onClick={addLike}>좋아요</button>
        {likes}
      </div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 100%;
  margin: auto;
  padding: 20px;
`;

const TitleWrapper = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const StyledProgressBar = styled(ProgressBar)`
  height: 40px;
`;

export default MultiVoted;
