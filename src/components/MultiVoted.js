import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styled from "styled-components";
import { FiThumbsUp } from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";

import colors from "../shared/colors";
import { useDispatch, useSelector } from "react-redux";
import { AddLikeDB } from "../redux/actions/multiLike";

const MultiVoted = props => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);
  const dataList = useSelector(state => state.multiDetail.multiDetail);
  const multiList = dataList.multi;
  // const DataList = props.dataList.multi;
  const multiId = props.multiId;
  const [likes, setLikes] = useState(multiList.likeCnt);

  const TotalCnt =
    multiList.voteCntA +
    multiList.voteCntB +
    multiList.voteCntC +
    multiList.voteCntD +
    multiList.voteCntE;

  const PerA = (multiList.voteCntA / TotalCnt) * 100;
  const PerB = (multiList.voteCntB / TotalCnt) * 100;
  const PerC = (multiList.voteCntC / TotalCnt) * 100;
  const PerD = (multiList.voteCntD / TotalCnt) * 100;
  const PerE = (multiList.voteCntE / TotalCnt) * 100;

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
    if (multiList.liked === null) {
      dispatch(AddLikeDB(multiId));
      setLikes(multiList.likeCnt + 1);
    } else {
      return;
    }
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>{multiList.title}</Title>
      </TitleWrapper>
      <Date>{multiList.date}</Date>

      <TitleHr />

      <ProgressWrapper>
        <div>
          <SelectContent>
            {multiList.contentA} {perA}
          </SelectContent>
          <EitherProgress>
            <ProgressLabel>
              <div style={{ margin: "8px 0px 0px 10px" }}>{perA + "%"}</div>
              <div style={{ margin: "8px 10px 0px 0px" }}></div>
            </ProgressLabel>
            <HighLight width={perA + "%"} />
          </EitherProgress>
          <SelectContent>
            {multiList.contentB} {perB}
          </SelectContent>
          <EitherProgress>
            <ProgressLabel>
              <div style={{ margin: "8px 0px 0px 10px" }}>{perB + "%"}</div>
              <div style={{ margin: "8px 10px 0px 0px" }}></div>
            </ProgressLabel>
            <HighLight width={perB + "%"} />
          </EitherProgress>
          <SelectContent>
            {multiList.contentC} {perC}
          </SelectContent>
          <EitherProgress>
            <ProgressLabel>
              <div style={{ margin: "8px 0px 0px 10px" }}>{perC + "%"}</div>
              <div style={{ margin: "8px 10px 0px 0px" }}></div>
            </ProgressLabel>
            <HighLight width={perC + "%"} />
          </EitherProgress>
          <EitherProgress>
            <ProgressLabel>
              <div style={{ margin: "8px 0px 0px 10px" }}>{perD + "%"}</div>
              <div style={{ margin: "8px 10px 0px 0px" }}></div>
            </ProgressLabel>
            <HighLight width={perD + "%"} />
          </EitherProgress>
          <EitherProgress>
            <ProgressLabel>
              <div style={{ margin: "8px 0px 0px 10px" }}>{perE + "%"}</div>
              <div style={{ margin: "8px 10px 0px 0px" }}></div>
            </ProgressLabel>
            <HighLight width={perE + "%"} />
          </EitherProgress>
          <SelectContent>
            {multiList.contentA} {perA}
          </SelectContent>
          <StyledProgressBar
            labelSize="2px"
            margin="auto"
            width="620px"
            height="32px"
            baseBgColor={colors.white}
            bgColor={colors.blue}
            borderRadius="8px"
            completed={perA}
            maxCompleted={100}
          />
        </div>
        <div>
          <SelectContent>
            {multiList.contentB} {perB}
          </SelectContent>
          <StyledProgressBar
            labelSize="2px"
            margin="auto"
            width="620px"
            height="32px"
            baseBgColor={colors.white}
            bgColor={colors.blue}
            borderRadius="8px"
            completed={perB}
            maxCompleted={100}
          />
        </div>
        {multiList.contentC !== null ? (
          <div>
            <SelectContent>
              {multiList.contentC} {perC}
            </SelectContent>
            <StyledProgressBar
              labelSize="2px"
              margin="auto"
              width="620px"
              height="32px"
              baseBgColor={colors.white}
              bgColor={colors.blue}
              borderRadius="8px"
              completed={perC + "%"}
              maxCompleted={100}
            />
          </div>
        ) : null}
        {multiList.contentD !== null ? (
          <div>
            <SelectContent>
              {multiList.contentD} {perD}
            </SelectContent>
            <StyledProgressBar
              labelSize="2px"
              margin="auto"
              width="620px"
              height="32px"
              baseBgColor={colors.white}
              bgColor={colors.blue}
              borderRadius="8px"
              completed={perD + "%"}
              maxCompleted={100}
            />
          </div>
        ) : null}
        {multiList.contentE !== null ? (
          <div>
            <SelectContent>
              {multiList.contentE} {perE}
            </SelectContent>
            <StyledProgressBar
              labelSize="2px"
              margin="auto"
              width="620px"
              height="32px"
              baseBgColor={colors.white}
              bgColor={colors.blue}
              borderRadius="8px"
              completed={perE + "%"}
              maxCompleted={100}
            />
          </div>
        ) : null}
      </ProgressWrapper>

      <InfoWarpper>
        <Nickname>{multiList.nickname}</Nickname>
        <RightWarpper>
          <CommentWarpper>
            <FiMessageSquare />{" "}
            <TotalComment>
              {dataList.comment.length + dataList.childComment.length}
            </TotalComment>
          </CommentWarpper>
          <LikeWarpper>
            <LikeBtn onClick={addLike}>
              <FiThumbsUp />
            </LikeBtn>{" "}
            <TotalLike>{likes}</TotalLike>
          </LikeWarpper>
        </RightWarpper>
      </InfoWarpper>
      <CommentHr />
    </Container>
  );
};

const Container = styled.div`
  width: 620px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const Title = styled.p`
  font-size: 24px;
`;

const TitleHr = styled.hr`
  margin: 34px auto 34px auto;
  width: 103px;
`;

const ProgressWrapper = styled.div`
  margin: auto;
`;

const SelectContent = styled.p`
  font-size: 16px;
  color: ${colors.blue};
`;

const StyledProgressBar = styled(ProgressBar)`
  height: 40px;
`;

const EitherProgress = styled.div`
  margin: 24px auto;
  border: 2px solid #00397c;
  border-radius: 6px;
  width: 100%;
  height: 32px;
`;

const HighLight = styled.div`
  background-color: ${colors.blue};
  transition: 1s;
  width: ${props => props.width};
  height: 32px;
  border-radius: 5px;
`;

const ProgressLabel = styled.div`
  width: 480px;
  position: absolute;
  color: ${colors.white};
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`;

const InfoWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Nickname = styled.p`
  font-size: 14px;
  color: ${colors.darkGray};
`;

const Date = styled.p`
  margin: auto;
  color: ${colors.gray5};
  font-size: 14px;
`;

const RightWarpper = styled.div`
  width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CommentWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${colors.blue};
`;

const TotalComment = styled.p`
  font-size: 12px;
`;

const LikeWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${colors.red};
`;

const LikeBtn = styled.button`
  font-size: 16px;
  color: ${colors.red};
  border: none;
  background-color: ${colors.white};
`;

const TotalLike = styled.p`
  font-size: 12px;
`;

const CommentHr = styled.hr`
  border: none;
  width: 620px;
  height: 1px;
  background-color: ${colors.lineGray};
`;

export default MultiVoted;
