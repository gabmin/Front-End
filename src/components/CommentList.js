import React from "react";
import Comment from "./Comment";

const CommentList = props => {
  const dataList = props.dataList.Comment;
  return (
    <React.Fragment>
      <div>
        {dataList.map((p, i) => (
          <div>
            <Comment
              User={p.User}
              date={p.date}
              commentLikeCnt={p.commentLikeCnt}
              comment={p.comment}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default CommentList;
