import React from "react";
import styled from "styled-components";

import colors from "../shared/colors";

const CommentNick = props => {
  const { children } = props;
  return <P>{children}</P>;
};

const P = styled.p`
  font-size: 12px;
  font-weight: 600;

  color: ${colors.darkGray};
`;

export default CommentNick;
