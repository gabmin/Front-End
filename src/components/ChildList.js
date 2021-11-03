import React from "react";
import styled from "styled-components";

import ChildComment from "./ChildComment";

const ChildList = props => {
  const childList = props.dataList.childComment;
  const multiId = props.multiId;
  const { parentComment } = props;

  const filterList = childList.filter(p => {
    const commentId = p.parentComment;
    return parentComment === commentId;
  });

  return (
    <>
      <TempWarpper>
        {filterList.map(p => (
          <div>
            <ChildComment
              multiId={multiId}
              nickname={p.nickname}
              date={p.date}
              id={p.id}
              parentComment={p.parentComment}
              comment={p.comment}
              deleted={p.deleted}
            />
          </div>
        ))}
      </TempWarpper>
    </>
  );
};

const TempWarpper = styled.div`
  width: 90%;
  margin: 0 0 0 10%;
  background-color: yellow;
`;

export default ChildList;
