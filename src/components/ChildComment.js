import React from "react";

const ChildComment = props => {
  const { User, date, id, parentComment, comment } = props;
  return (
    <React.Fragment>
      <div>
        <div>{User[0].nickname}</div>
        <div>{date}</div>
        {/* <div>{parentComment}</div> */}
        <div>{comment}</div>
        <button>댓글작성</button>
      </div>
    </React.Fragment>
  );
};

export default ChildComment;
