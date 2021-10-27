import React from "react";
import CommentList from "./CommentList";

const MultiComment = props => {
  const dataList = props.dataList;
  return (
    <React.Fragment>
      <p>댓글 {dataList.commentCnt}개</p>
      <textarea></textarea>
      <button>작성</button>
      <hr></hr>
      <div>
        <CommentList dataList={dataList} />
      </div>
    </React.Fragment>
  );
};

export default MultiComment;
