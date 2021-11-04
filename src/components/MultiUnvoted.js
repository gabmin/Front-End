import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import AnswerList from "./AnswerList";
import { AddLikeDB } from "../redux/actions/multiLike";

const MultiUnvoted = props => {
  const dispatch = useDispatch();
  const DataList = props.dataList.multi;
  const multiId = props.multiId;
  const render = props.render;
  const [likes, setLikes] = useState(DataList.likeCnt);
  console.log("unvotedrender", DataList);

  const addLike = () => {
    if (DataList.liked === null) {
      dispatch(AddLikeDB(multiId));
      setLikes(likes + 1);
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
      <DesWrapper>
        <p>{DataList.description}</p>
      </DesWrapper>
      <div>
        <AnswerList dataList={DataList} render={render} />
      </div>
      <hr></hr>
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

const DesWrapper = styled.div`
  font-size: 14px;
`;

export default MultiUnvoted;
