import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { ReactComponent as CommonIcon } from "../images/CommonIcon.svg";
import { blue, red, mobile, tablet } from "../shared/style";
import { useCallback } from "react";

const Nickname = ({ nickname, userId, width, height, fontSize }) => {
  const onClickNick = useCallback(() => {
    history.push(`/profile/${userId}`);
  }, [userId]);

  return (
    <Container onClick={onClickNick}>
      <StyledCommonIcon width={width} height={height} />
      <Nick fontSize={fontSize}>{nickname}</Nick>
    </Container>
  );
};

Nickname.defaultProps = {
  width: "16px",
  height: "16px",
  fontSize: "14px",
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 110px;
  height: 16px;
  color: black;
  cursor: pointer;
`;

const StyledCommonIcon = styled(CommonIcon)`
  width: ${props => props.width};
  height: ${props => props.height};
  margin-right: 8px;
`;

const Nick = styled.span`
  font-size: ${props => props.fontSize};
`;

export default Nickname;
