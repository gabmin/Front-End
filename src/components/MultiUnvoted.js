import React from "react";
import styled from "styled-components";
import AnswerList from "./AnswerList";

const MultiUnvoted = props => {
  const DataList = props.dataList;
  return (
    <Container>
      <TitleDiv>
        <p>{DataList.title}</p>
      </TitleDiv>
      <hr></hr>
      <DesDiv>
        <p>{DataList.description}</p>
      </DesDiv>
      <div>
        <AnswerList dataList={DataList} />
      </div>
      <hr></hr>
      <p>{DataList.user}</p>
      <p>{DataList.date}</p>
      {/* <p>{DataList.editedDate}</p>
      <p>{DataList.completed}</p> */}
      <p>좋아요{DataList.likeCnt}</p>
      <p>댓글{DataList.commentCnt}</p>
    </Container>
  );
};

const Container = styled.div`
  max-width: 50%;
  margin: auto;
  padding: 20px;
`;

const TitleDiv = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const DesDiv = styled.div`
  font-size: 14px;
`;

export default MultiUnvoted;
