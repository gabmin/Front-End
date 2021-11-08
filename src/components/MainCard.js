import React, { useCallback } from "react";
import styled from "styled-components";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";

import { history } from "../redux/configureStore";

const Card = ({
  title,
  content,
  width,
  height,
  margin,
  contentSize,
  titleSize,
  center,
  color,
  type,
  username,
  commentNum,
  likeNum,
  id,
  date,
}) => {
  const styles = {
    width: width,
    height: height,
    margin: margin,
    center: center,
  };

  const onClickDetail = useCallback(() => {
    if (type === "either") {
      history.push(`/either/${id}`);
      return;
    }
    history.push(`/multi/${id}`);
  }, [id, type]);

  return (
    <Layout {...styles} onClick={onClickDetail} type={type}>
      <TextLayout>
        <Subject titleSize={titleSize}>{title}</Subject>
        <Date>{date.substring(0, 16)}</Date>
        {type === "multi" && (
          <Content contentSize={contentSize} color={color}>
            {content}
          </Content>
        )}
      </TextLayout>
      <Info type={type}>
        <Username>{username}</Username>
        <div>
          {type === "multi" && (
            <CommentNum>
              <StyledFiMessageSquare />
              {commentNum}
            </CommentNum>
          )}
          <span>
            <StyledFiThumbsUp />
            {likeNum}
          </span>
        </div>
      </Info>
    </Layout>
  );
};

const blue = "#00397c";
const red = "#E25B45";
const mobile = "1280px";

Card.defaultProps = {
  width: "290px",
  height: "192px",
  margin: "auto",
  titleSize: "20px",
  contentSize: "1em",
  center: false,
  color: "black",
  icon: false,
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width};
  height: ${props => (props.type === "multi" ? "336px" : "192px")};
  margin: ${props => props.margin};
  text-align: ${props => (props.center ? "center" : "unset")};
  border: 2px solid ${blue};
  border-radius: 10px;
  padding: 20px 35px;
  box-sizing: border-box;
  cursor: pointer;

  @media screen and (max-width: 1540px) {
    width: 90%;
  }
`;

const TextLayout = styled.div`
  width: 90%;

  p {
    margin: 0.5em;
  }
`;

const Subject = styled.p`
  height: 55px;
  width: 100%;
  font-size: ${props => props.titleSize};
  font-weight: bold;
  color: ${blue};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Content = styled.p`
  height: 105px;
  width: 100%;
  font-size: 16px;
  font-weight: normal;
  color: gray;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const Date = styled.p`
  width: 60%;
  font-size: 12px;
  color: gray;
  padding-bottom: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid lightgray;
`;

const Username = styled.span`
  color: black;
`;

const Info = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 1em;
  margin: auto;
  color: ${red};
  font-size: 14px;
  top: ${props => (props.type === "multi" ? "10px" : "0")};
`;

const StyledFiMessageSquare = styled(FiMessageSquare)`
  position: relative;
  top: 2px;
  margin-right: 5px;
`;

const StyledFiThumbsUp = styled(FiThumbsUp)`
  position: relative;
  top: 2px;
  margin-right: 5px;
`;

const CommentNum = styled.span`
  color: ${blue};
  margin: 0 15px;
`;

export default Card;
