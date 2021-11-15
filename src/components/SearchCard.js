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
  editedDate,
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
          <span
            style={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={onClickNick}
          >
            {nickname}
          </span>
          <span
            style={{ color: gray5, margin: "0 30px", fontWeight: "normal" }}
          >
            {date.substring(0, 16)}
          </span>
        </div>
        <div style={{ position: "relative", right: "-85px" }}>
          {type === "객관식" && (
            <FiMessageSquare
              stroke={blue}
              style={{ position: "relative", top: "1px" }}
            />
          )}
          <span style={{ color: blue }}>{type === "객관식" && commentCnt}</span>
          <FiThumbsUp stroke={red} style={{ marginLeft: "10px" }} />
          <span style={{ color: red }}> {likeCnt}</span>
        </div>
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 840px;
  width: 90%;
  height: 112px;
  border: 1px solid ${blue};
  border-radius: 5px;
  margin: 10px auto;
  box-sizing: border-box;
  user-select: none;
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

  div {
    display: flex;
    flex-direction: row;
  }

  .subjectContent {
    width: 619px;
    color: ${blue};
    font-weight: bold;
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
  width: 619px;
  margin: 0 auto 14px;
  flex-direction: row;
  justify-content: space-between;
`;

export default SearchCard;
