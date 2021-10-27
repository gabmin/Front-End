import React from "react";
import styled from "styled-components";
import ChildComment from "./ChildComment";

const ChildList = props => {
  const childList = props.dataList.childComment;
  const { parentComment } = props;

  const filterList = childList.filter(p => {
    const commentId = p.parentComment;
    return parentComment === commentId;
  });

  return (
    <React.Fragment>
      <TempDiv>
        {filterList.map(p => (
          <div>
            <ChildComment
              User={p.User}
              date={p.date}
              id={p.id}
              parentComment={p.parentComment}
              comment={p.comment}
            />
          </div>
        ))}
      </TempDiv>
    </React.Fragment>
  );
};

const TempDiv = styled.div`
  width: 90%;
  margin: 0 0 0 10%;
  background-color: yellow;
`;

export default ChildList;
