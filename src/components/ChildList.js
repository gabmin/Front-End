import React from "react";
import styled from "styled-components";
import ChildComment from "./ChildComment";

const ChildList = props => {
  const dataList = props.dataList;
  const commentList = props.dataList.Comment;
  const childList = props.dataList.childComment;
  const { parentComment } = props;

  console.log("코멘트리스트", commentList);
  console.log("차일드리스트", childList);
  // const parentId =
  const filterList = childList.filter((p, i) => {
    const commentId = p.parentComment;
    console.log("피차코아이디", p);
    return parentComment === commentId;
  });

  console.log("필터테스트", filterList);

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
  background-color: yellow;
`;

export default ChildList;
