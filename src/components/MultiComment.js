import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import CommentList from "./CommentList";
import CommentInput from "../elements/CommentInput";

const MultiComment = props => {
  const dataList = useSelector(state => state.multiDetail.multiDetail);
  const multiId = props.multiId;
  const render = props.render;
  console.log("commentdataList", dataList);
  const [action, setAction] = useState(false);

  const { AddCommentDBLoading, AddCommentDBDone } = useSelector(
    state => state.comment,
  );

  // useEffect(() => {
  //   if (AddCommentDBDone && action === true) {
  //     setAction(false);
  //   } else if (AddCommentDBDone && action === false) {
  //     setAction(true);
  //   }
  // }, [AddCommentDBDone]);

  return (
    <>
      <TempWarpper>
        <TextAreaWarpper>
          <p>댓글 {dataList.multi.commentCnt}개</p>
          <CommentInput multiId={multiId} render={render} />
        </TextAreaWarpper>
        <hr></hr>
        <div>
          <CommentList multiId={multiId} render={render} />
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
