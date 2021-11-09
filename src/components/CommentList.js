import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Comment from "./Comment";

const CommentList = props => {
  // const dataList = useSelector(state => state.multiDetail.multiDetail);
  const dataList = props.dataList;
  const commentList = dataList.comment;
  const multiId = props.multiId;
  const render = props.render;
  const renderState = props.renderState;

  return (
    <>
      <TempWarpper>
        {commentList.map((p, i) => (
          <div>
            <Comment
              dataList={dataList}
              multiId={multiId}
              render={render}
              renderState={renderState}
              nickname={p.nickname}
              comment={p.comment}
              commentDate={p.date}
              commentLikeCnt={p.CommentLikeCnt}
              id={p.id}
              deleted={p.deleted}
              liked={p.liked}
            />
          </div>
        ))}
      </TempWarpper>
    </>
  );
};

const TempWarpper = styled.div`
  width: 100%;
  margin: auto;
`;

export default CommentList;
