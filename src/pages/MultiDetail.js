import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MultiComment from "../components/MultiComment";
import MultiUnvoted from "../components/MultiUnvoted";
import MultiVoted from "../components/MultiVoted";
import { DetailDB } from "../redux/actions/multiDetail";

const MultiDetail = props => {
  const dispatch = useDispatch();

  const multiId = props.match.params.multi_id;
  const multiDetail = useSelector(state => state.multiDetail.multiDetail);
  const userInfo = useSelector(state => state.user.userInfo);
  console.log("userInfo", userInfo);
  const dataList = multiDetail.multi && multiDetail;
  console.log("dataList", dataList);

  // const dataList = {
  //   title: "종목 추천 좀",
  //   multiId: multiId,
  //   user: "user",
  //   description: "종목추천 부탁드립니다",
  //   contentA: "전국민 주주시대 삼성전자",
  //   contentB: "주춤할때 담아야지 카카오",
  //   contentC: "정진이형 믿고 간다 셀트리온",
  //   contentD: "지구 좁다 우주로 가자 테슬라",
  //   contentE: "언제까지 주식이죠 비트코인",
  //   voteCntA: 1,
  //   voteCntB: 2,
  //   voteCntC: 3,
  //   voteCntD: 4,
  //   voteCntE: 5,
  //   date: "date",
  //   editedDate: "editedDate",
  //   completed: false,
  //   likeCnt: "0",
  //   commentCnt: "0",
  //   voted: true,
  //   liked: false,
  //   Comment: [
  //     {
  //       id: "111",
  //       multi: multiId,
  //       comment: "당연히 삼전 아닌가요",
  //       commentLikeCnt: "3",
  //       date: "date",
  //       edited: "edited",
  //       editedDate: "editedDate",
  //       User: [
  //         {
  //           id: "joorin",
  //           nickname: "주린이",
  //         },
  //       ],
  //     },
  //     {
  //       id: "222",
  //       multi: multiId,
  //       comment: "당연히 카카오 아닌가요",
  //       commentLikeCnt: "7",
  //       date: "date",
  //       edited: "edited",
  //       editedDate: "editedDate",
  //       User: [
  //         {
  //           id: "joorin11",
  //           nickname: "주린이11",
  //         },
  //       ],
  //     },
  //   ],
  //   childComment: [
  //     {
  //       id: "ch111",
  //       multi: multiId,
  //       parentComment: "111",
  //       comment: "삼전은 아직입니다",
  //       date: "date",
  //       edited: "edited",
  //       editedDate: "editedDate",
  //       User: [
  //         {
  //           id: "joorin2",
  //           nickname: "주린이2",
  //         },
  //       ],
  //     },
  //     {
  //       id: "ch222",
  //       multi: multiId,
  //       parentComment: "222",
  //       comment: "역시 삼전입니다",
  //       date: "date",
  //       edited: "edited",
  //       editedDate: "editedDate",
  //       User: [
  //         {
  //           id: "joorin22",
  //           nickname: "주린이22",
  //         },
  //       ],
  //     },
  //   ],
  // };

  useEffect(() => {
    dispatch(DetailDB(multiId));
  }, [dispatch, multiId]);

  if (
    dataList &&
    (userInfo.nickname === dataList.multi.nickname ||
      dataList.multi.voted !== null)
  ) {
    console.log("voted", dataList.multi.voted);
    return (
      <div>
        <div>
          <MultiVoted dataList={dataList} />
        </div>
        <div>{/* <MultiComment dataList={dataList} /> */}</div>
      </div>
    );
  } else {
    return <div>{dataList && <MultiUnvoted dataList={dataList} />}</div>;
  }
};

export default MultiDetail;
