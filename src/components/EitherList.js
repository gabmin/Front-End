import React, { useRef } from "react";
import styled from "styled-components";

import EitherListCard from "./EitherListCard";
import EitherCompleteListCard from "./EitherCompleteListCard";
import { mobile, tablet } from "../shared/style";
import { useSelector } from "react-redux";

const EitherList = ({ PostList, PostingList, PostCompleteList }) => {
  const { PostDBDone } = useSelector(state => state.eitherCard);
  console.log(PostCompleteList);
  return (
    <>
      <div>
        {PostDBDone === true && (
          <div>
            {PostList &&
              PostList?.map(v => (
                <EitherListCard
                  key={v.toString()}
                  eitherId={v.eitherId}
                  nickname={v.nickname}
                  title={v.title}
                  contentA={v.contentA}
                  contentB={v.contentB}
                  date={v.date}
                  likeCnt={v.likeCnt}
                  voteCntA={v.voteCntA}
                  voteCntB={v.voteCntB}
                  liked={v.liked}
                  voted={v.voted}
                  completed={v.completed}
                  user={v.user}
                />
              ))}
            {PostingList &&
              PostingList?.map(v => (
                <EitherListCard
                  key={v.toString()}
                  eitherId={v.eitherId}
                  nickname={v.nickname}
                  title={v.title}
                  contentA={v.contentA}
                  contentB={v.contentB}
                  date={v.date}
                  likeCnt={v.likeCnt}
                  voteCntA={v.voteCntA}
                  voteCntB={v.voteCntB}
                  liked={v.liked}
                  voted={v.voted}
                  completed={v.completed}
                  user={v.user}
                />
              ))}
            {PostCompleteList &&
              PostCompleteList?.map(v => (
                <EitherCompleteListCard
                  key={v.toString()}
                  eitherId={v.eitherId}
                  nickname={v.nickname}
                  title={v.title}
                  contentA={v.contentA}
                  contentB={v.contentB}
                  date={v.date}
                  likeCnt={v.likeCnt}
                  voteCntA={v.voteCntA}
                  voteCntB={v.voteCntB}
                  liked={v.liked}
                  voted={v.voted}
                  completed={v.completed}
                  user={v.user}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default EitherList;
