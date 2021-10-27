import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styled from "styled-components";

const MultiVoted = props => {
  const DataList = props.dataList;
  const TotalCnt =
    DataList.voteCntA +
    DataList.voteCntB +
    DataList.voteCntC +
    DataList.voteCntD +
    DataList.voteCntE;
  console.log("합계", TotalCnt);
  const PerA = (DataList.voteCntA / TotalCnt) * 100;
  const PerB = (DataList.voteCntB / TotalCnt) * 100;
  const PerC = (DataList.voteCntC / TotalCnt) * 100;
  const PerD = (DataList.voteCntD / TotalCnt) * 100;
  const PerE = (DataList.voteCntE / TotalCnt) * 100;
  const [perA, setPerA] = useState(0);
  setTimeout(() => {
    setPerA(PerA);
  }, 1000);
  const [perB, setPerB] = useState(0);
  setTimeout(() => {
    setPerB(PerB);
  }, 1000);
  const [perC, setPerC] = useState(0);
  setTimeout(() => {
    setPerC(PerC);
  }, 1000);
  const [perD, setPerD] = useState(0);
  setTimeout(() => {
    setPerD(PerD);
  }, 1000);
  const [perE, setPerE] = useState(0);
  setTimeout(() => {
    setPerE(PerE);
  }, 1000);
  return (
    <Container>
      <p>{DataList.contentA}</p>
      <StyledProgressBar completed={perA} maxCompleted={100} />
      <p>{DataList.contentB}</p>
      <StyledProgressBar completed={perB} maxCompleted={100} />
      <p>{DataList.contentC}</p>
      <StyledProgressBar completed={perC} maxCompleted={100} />
      <p>{DataList.contentD}</p>
      <StyledProgressBar completed={perD} maxCompleted={100} />
      <p>{DataList.contentE}</p>
      <StyledProgressBar completed={perE} maxCompleted={100} />
    </Container>
  );
};

const Container = styled.div`
  max-width: 50%;
  margin: auto;
  padding: 20px;
`;

const StyledProgressBar = styled(ProgressBar)`
  height: 40px;
`;

export default MultiVoted;
