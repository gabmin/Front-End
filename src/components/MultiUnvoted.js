import React from "react";
import styled from "styled-components";
import AnswerList from "./AnswerList";

const MultiUnvoted = props => {
  const DataList = props.dataList;
  return (
    <React.Fragment>
      <TitleDiv>
        <p>{DataList.title}</p>
      </TitleDiv>

      <hr></hr>
      <p>{DataList.description}</p>
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
    </React.Fragment>
  );
};

const TitleDiv = styled.div``;

export default MultiUnvoted;
