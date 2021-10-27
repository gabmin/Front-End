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
    setPerA(PerA.toFixed(0));
  }, 1000);
  const [perB, setPerB] = useState(0);
  setTimeout(() => {
    setPerB(PerB.toFixed(0));
  }, 1200);
  const [perC, setPerC] = useState(0);
  setTimeout(() => {
    setPerC(PerC.toFixed(0));
  }, 1400);
  const [perD, setPerD] = useState(0);
  setTimeout(() => {
    setPerD(PerD.toFixed(0));
  }, 1600);
  const [perE, setPerE] = useState(0);
  setTimeout(() => {
    setPerE(PerE.toFixed(0));
  }, 1800);
  return (
    <Container>
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
