import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";

import { SetParams } from "../redux/reducers/paramsSlice";
import { history } from "../redux/configureStore";
import { blue, red, mobile, tablet } from "../shared/style";
import Nickname from "./Nickname";

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
  userId,
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
  const dispatch = useDispatch();
  const onClickDetail = useCallback(() => {
    window.scroll(0, 0);
    if (type === "either") {
      // history.push(`/either/${id}`);
      dispatch(SetParams(id));
      history.push({
        pathname: "/either",
      });
      return;
    }
    history.push(`/multi/${id}`);
  }, [id, type, dispatch]);

  return (
    <div data-testid="slickcard">
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
          <Nickname nickname={username} userId={userId}></Nickname>
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
    </div>
  );
};

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
  padding: 20px 30px;
  box-sizing: border-box;
  cursor: pointer;

  :hover {
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 1) 0%,
      rgba(229, 241, 255, 1) 100%
    );
  }

  @media screen and (max-width: ${mobile}) {
    width: 100%;
    padding: 20px 10px 0px;
  }
`;

const TextLayout = styled.div`
  width: 100%;
`;

const Subject = styled.p`
  height: 52px;
  width: 100%;
  font-size: ${props => props.titleSize};
  font-weight: bold;
  color: ${blue};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  box-sizing: border-box;
  margin: 0;
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
  width: 100px;
  font-size: 12px;
  color: gray;
  padding-bottom: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid lightgray;
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
