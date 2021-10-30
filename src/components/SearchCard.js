import React, { useCallback } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const SearchCard = ({
  type,
  id,
  user,
  title,
  date,
  editedDate,
  completed,
  likeCnt,
}) => {
  const onClickContent = useCallback(() => {
    if (type === "찬반") {
      history.push(`/either/${id}`);
      return;
    }
    history.push(`/multi/${id}`);
  }, [id, type]);

  console.log(id, user, date, editedDate, completed, likeCnt);
  return (
    <Container onClick={onClickContent}>
      <Subjects>
        <div>
          <Type>{type}</Type>
          {title}
        </div>
        {completed ? "종료됨" : "진행중"}
      </Subjects>
      <Contents>
        <span>{user}</span>
        <span>{date}</span>
        <span>{likeCnt}</span>
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100px;
  border: 1px solid lightgray;
  margin: 10px 0;
  cursor: pointer;
`;

const Subjects = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1em 2em;
  div {
    display: flex;
    flex-direction: row;
  }
`;

const Type = styled.div`
  display: flex;
  justify-content: center;
  width: 3em;
  margin: 0 10px;
  padding: 0 5px;
  font-weight: 100;
  background-color: lightgray;
  color: black;
  border-radius: 10px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export default SearchCard;
