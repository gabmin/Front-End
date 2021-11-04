import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import CommentList from "./CommentList";
import CommentInput from "../elements/CommentInput";

const MultiComment = props => {
  const dispatch = useDispatch();
  const dataList = useSelector(state => state.multiDetail.multiDetail);
  const multiId = props.multiId;
  const render = props.render;
  const renderState = props.state;
  console.log("renderState", renderState);
  console.log("commentdataList", dataList.comment);
  const [action, setAction] = useState(false);

  // const { AddCommentDBLoading, AddCommentDBDone } = useSelector(
  //   state => state.comment,
  // );

  // useEffect(() => {
  //   dispatch()
  // }, []);

  return (
    <>
      <TempWarpper>
        <TextAreaWarpper>
          <p>댓글 {dataList.comment.length + dataList.childComment.length}개</p>
          <CommentInput multiId={multiId} />
        </TextAreaWarpper>
        <hr></hr>
        <div>
          <CommentList
            multiId={multiId}
            dataList={dataList}
            // render={render}
            // renderState={renderState}
          />
        </div>
      </TempWarpper>
    </>
  );
};

const TempWarpper = styled.div`
  max-width: 60%;
  margin: auto;
  /* background-color: green; */
`;

const TextAreaWarpper = styled.div`
  max-width: 80%;
  margin: auto;
  background-color: green;
`;

export default MultiComment;
