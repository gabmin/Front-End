import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import SearchCard from "../components/SearchCard";
import { getMyPolls, getMyPosts } from "../redux/actions/profile";

const Profile = props => {
  const userId = props.match.params.user_id;
  const dispatch = useDispatch();

  const { myPosts, myPolls } = useSelector(state => state.profile);
  const [clicked, setClicked] = useState("posts");

  useEffect(() => {
    dispatch(getMyPosts(userId));
    dispatch(getMyPolls(userId));
  }, [dispatch, userId]);

  // const posts = [
  //   {
  //     eitherId: "either1",
  //     user: "gom",
  //     title: "삼전 풀매수?",
  //     date: "2020-02-20 16:10:11",
  //     editedDate: null,
  //     completed: false,
  //     likeCnt: 10,
  //   },
  //   {
  //     eitherId: "either2",
  //     user: "gom",
  //     title: "삼전 풀매수2?",
  //     date: "2020-02-20 16:10:11",
  //     editedDate: null,
  //     completed: true,
  //     likeCnt: 10,
  //   },
  //   {
  //     multiId: "multi1",
  //     user: "gom",
  //     title: "내일 떡상 리스트다. 반박받음",
  //     date: "2020-02-20 16:10:11",
  //     editedDate: null,
  //     completed: false,
  //     likeCnt: 15,
  //   },
  // ];

  const onClickPostBtn = useCallback(type => {
    setClicked(type);
  }, []);
  console.log("clicked");
  console.log(clicked);

  return (
    <>
      <div>프로필 페이지 유저 아이디 : {userId}</div>
      <MyInfo>
        <Icon />
        닉네임
      </MyInfo>
      <PostsContainer>
        <PostBtns>
          <MyPostsBtn
            clicked={clicked}
            onClick={() => {
              onClickPostBtn("posts");
            }}
          >
            내 작성글
          </MyPostsBtn>
          <MyPollsBtn
            clicked={clicked}
            onClick={() => {
              onClickPostBtn("polls");
            }}
          >
            참여한 글
          </MyPollsBtn>
        </PostBtns>
        {clicked === "posts"
          ? myPosts.map((v, i) => (
              <SearchCard
                key={i}
                type={Object.keys(v).includes("eitherId") ? "찬반" : "객관식"}
                id={v.multiId || v.eitherId}
                title={v.title}
                user={v.user}
                date={v.date}
                editedDate={v.editedDate}
                completed={v.completed}
                likeCnt={v.likeCnt}
              />
            ))
          : myPolls.map((v, i) => (
              <SearchCard
                key={i}
                type={Object.keys(v).includes("eitherId") ? "찬반" : "객관식"}
                id={v.multiId || v.eitherId}
                title={v.title}
                user={v.user}
                date={v.date}
                editedDate={v.editedDate}
                completed={v.completed}
                likeCnt={v.likeCnt}
              />
            ))}
      </PostsContainer>
    </>
  );
};

const MyInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1000px;
  height: 300px;
  background-color: lightgray;
  margin: auto;
  padding: 50px 100px;
`;

const Icon = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: gray;
  margin: 0 0 15px;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  min-height: 1200px;
  border: 1px solid lightgray;
  margin: auto;
  padding: 50px 100px;
`;

const PostBtns = styled.div`
  display: flex;
  flex-direction: row;
`;

const MyPostsBtn = styled.span`
  margin: 0 1em;
  cursor: pointer;
  background-color: ${props => props.clicked === "posts" && "skyblue"};
`;

const MyPollsBtn = styled.span`
  margin: 0 1em;
  cursor: pointer;
  background-color: ${props => props.clicked === "polls" && "skyblue"};
`;

export default Profile;
