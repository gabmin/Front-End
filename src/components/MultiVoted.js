import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const MultiVoted = props => {
  const [per, setPer] = useState(0);
  setTimeout(() => {
    setPer(50);
  }, 2000);
  return (
    <React.Fragment>
      <ProgressBar completed={per} />
    </React.Fragment>
  );
};

export default MultiVoted;
