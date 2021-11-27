import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";

import { history } from "../redux/configureStore";
import { SetParams } from "../redux/reducers/paramsSlice";
import {
  blue,
  red,
  mobile,
  tablet,
  gray5,
  grayMultiply,
  darkGray,
} from "../shared/style";

const SearchCard = ({
  type,
  id,
  userId,
  title,
  date,
  completed,
  likeCnt,
  commentCnt,
  nickname,
}) => {
  const dispatch = useDispatch();

  const onClickContent = useCallback(() => {
    if (type === "찬반") {
      dispatch(SetParams(id));
      history.push({
        pathname: "/either",
      });
      return;
    }
    history.push(`/multi/${id}`);
  }, [id, type, dispatch]);

  const onClickNick = useCallback(() => {
    if (userId) {
      history.push(`/profile/${userId}`);
      window.scroll(0, 0);
    }
  }, [userId]);

  return (
    <Container>
      <Subjects onClick={onClickContent}>
        <Type type={type}>{type}</Type>
        <span className="subjectContent">{title}</span>
        <Completed completed={completed}>
          {completed ? "종료됨" : "진행중"}
        </Completed>
      </Subjects>
      <Contents>
        <div>
          {nickname && (
            <span className="searchCardNick" onClick={onClickNick}>
              {nickname}
            </span>
          )}
          <span className="dateContent">{date.substring(0, 16)}</span>
        </div>
        <IconWrapper>
          {type === "객관식" && <StyledFiMessage stroke={blue} />}
          <span style={{ color: blue, marginRight: "10px" }}>
            {type === "객관식" && commentCnt}
          </span>
          <StyledFiThumbsUp stroke={red} />
          <span style={{ color: red }}> {likeCnt}</span>
        </IconWrapper>
      </Contents>
    </Container>
  );
};

const IconWrapper = styled.div`
  position: relative;
  right: -85px;

  @media screen and (max-width: ${tablet}) {
    width: 100px;
    right: 0px;
    margin: 0;
  }
`;

const StyledFiMessage = styled(FiMessageSquare)`
  position: relative;
  margin-right: 5px;
  top: 1px;

  @media screen and (max-width: ${tablet}) {
  }
`;

const StyledFiThumbsUp = styled(FiThumbsUp)`
  margin-left: 0px;

  @media screen and (max-width: ${tablet}) {
    margin: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 840px;
  width: 90%;
  height: 112px;
  border: 1px solid ${blue};
  border-radius: 5px;
  margin: 10px auto;
  background-color: white;
  box-sizing: border-box;
  user-select: none;

  @media screen and (max-width: ${tablet}) {
    height: auto;
  }
`;

const Subjects = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  height: 39px;
  margin: 18px 20px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.3s;

  div {
    display: flex;
    flex-direction: row;
  }

  .subjectContent {
    width: 619px;
    color: ${blue};
    font-weight: bold;

    @media screen and (max-width: ${tablet}) {
      width: 100%;
    }
  }

  @media screen and (max-width: ${tablet}) {
    flex-direction: column;
    height: auto;
    margin: 18px auto;
  }
`;

const Completed = styled.span`
  color: ${props => (props.completed ? gray5 : red)};
  font-weight: bold;
`;

const Type = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 20px;
  padding: 0 5px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${props => (props.type === "찬반" ? "white" : blue)};
  color: ${props => (props.type === "찬반" ? blue : "white")};
  border: 1px solid ${blue};
  border-radius: 5px;
  box-sizing: border-box;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  width: 619px;
  margin: 0 auto 14px;
  justify-content: space-between;

  .searchCardNick {
    font-weight: bold;
    cursor: pointer;
    margin: 0 30px 0 0;
  }

  .dateContent {
    color: ${gray5};
    font-weight: normal;

    @media screen and (max-width: ${tablet}) {
      margin: 0;
    }
  }

  @media screen and (max-width: ${tablet}) {
    flex-direction: column;
    width: 95%;
  }
`;

export default SearchCard;
