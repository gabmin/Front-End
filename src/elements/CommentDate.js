import React from "react";
import styled from "styled-components";

import colors from "../shared/colors";

const CommentDate = props => {
  const { children } = props;
  return <P>{children}</P>;
};

const P = styled.p`
  font-size: 10px;
  color: ${colors.gray5};
`;

export default CommentDate;
