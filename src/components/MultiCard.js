import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const MultiCard = props => {
  const {
    multiId,
    title,
    description,
    user,
    date,
    editedDate,
    completed,
    likeCnt,
    commentCnt,
  } = props;
  const history = useHistory();
  const goToDetail = () => {
    history.push(`/multi/:${multiId}`);
  };
  return (
    <Container onClick={goToDetail}>
      <Card>
        <TitleDiv>
          <h1>{title}</h1>
        </TitleDiv>
        <DesDiv>
          <p>{description}</p>
        </DesDiv>
        <hr></hr>
        <FooterDiv>
          <UserDiv>
            <p>{user}</p>
            <p>{date}</p>
            {/* {isEdited ? <p>{editedDate}</p> : null} */}
          </UserDiv>
          <p>{likeCnt}</p>
          <p>{commentCnt}</p>
        </FooterDiv>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  width: 70%;
  height: 100%;
  padding: 20px;
  margin: 100px auto;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.3);
  opacity: 0.3;
`;

const Card = styled.div`
  width: 100%;
  min-height: 200px;
  padding: 20px 20px;
  margin: auto;
  box-sizing: border-box;
`;

const TitleDiv = styled.div`
  margin: 0 0 0 10px;
  min-height: 20%;
`;

const DesDiv = styled.div`
  min-height: 70%;
`;

const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserDiv = styled.div`
  font-size: 6px;
  display: flex;
  flex-direction: row;
`;

export default MultiCard;
