import React from "react";
import ChildList from "./ChildList";

const Comment = props => {
  const { User, date, commentLikeCnt, comment } = props;
  const dataList = props.dataList;
  console.log("코멘트데이터", User);
  return (
    <React.Fragment>
      <div>{User[0].nickname}</div>
      <div>{date}</div>
      <div>좋아요 {commentLikeCnt}</div>
      <div>{comment}</div>
      <button>댓글작성</button>
      <ChildList />
    </React.Fragment>
  );
};

export default Comment;
