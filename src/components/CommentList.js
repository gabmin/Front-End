import React from "react";
import styled from "styled-components";

import Comment from "./Comment";

const CommentList = props => {
  const dataList = props.dataList;
  const commentList = props.dataList.Comment;
  return (
    <>
      <TempWarpper>
        {commentList.map((p, i) => (
          <div>
            <Comment
              dataList={dataList}
              User={p.User}
              date={p.date}
              commentLikeCnt={p.commentLikeCnt}
              comment={p.comment}
              id={p.id}
            />
          </div>
        ))}
      </TempWarpper>
    </>
  );
};

const TempWarpper = styled.div`
  width: 80%;
  margin: auto;
  background-color: yellow;
`;

export default CommentList;
