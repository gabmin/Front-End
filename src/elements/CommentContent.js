import React from "react";
import styled from "styled-components";

import colors from "../shared/colors";

const CommentContent = props => {
  const { children } = props;
  return <P>{children}</P>;
};

const P = styled.p`
  font-size: 12px;
  color: ${colors.darkGray};
`;

export default CommentContent;
