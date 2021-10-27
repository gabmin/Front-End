import React from "react";
import ChildComment from "./ChildComment";

const ChildList = props => {
  return (
    <React.Fragment>
      <div>
        <ChildComment />
      </div>
    </React.Fragment>
  );
};

export default ChildList;
