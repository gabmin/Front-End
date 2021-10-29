import React, { useCallback } from "react";
import styled from "styled-components";
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
    <>
      <Layout {...styles}>
        <TextLayout>
          <Subject titleSize={titleSize}>{title}</Subject>
          {type === "multi" && (
            <Content contentSize={contentSize} color={color}>
              {content}
            </Content>
          )}
        </TextLayout>
        <DetailBtn onClick={onClickDetail}>투표하러 가기 {">"}</DetailBtn>
        <Info>
          <span>{username}</span>
          {type === "multi" && <span>💬{commentNum}</span>}
          <span>💗{likeNum}</span>
        </Info>
      </Layout>
    </>
  );
};

Card.defaultProps = {
  width: "250px",
  height: "100%",
  margin: "0",
  titleSize: "1.2em",
  contentSize: "1em",
  center: false,
  color: "black",
  icon: false,
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  text-align: ${props => (props.center ? "center" : "unset")};
  border: 1px solid gray;
`;

const TextLayout = styled.div`
  width: 90%;
  padding: 0.5em;

  p {
    margin: 0.5em;
  }
`;

const Subject = styled.p`
  font-size: ${props => props.titleSize};
  font-weight: bold;
`;

const Content = styled.p`
  height: 60px;
  font-size: ${props => props.contentSize};
  font-weight: normal;
  color: ${props => props.color};
`;

const DetailBtn = styled.p`
  position: relative;
  font-size: 0.8em;
  cursor: pointer;
  margin: 1em 2em;
  right: -8em;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-around;
  width: 95%;
  height: 2em;
  margin: auto;
  padding: 0.7em 0;
  border-top: 1px solid lightgray;
`;

export default Card;
