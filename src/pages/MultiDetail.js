import React from "react";
import MultiComment from "../components/MultiComment";
import MultiUnvoted from "../components/MultiUnvoted";
import MultiVoted from "../components/MultiVoted";

const MultiDetail = props => {
  const multiId = props.match.params.multi_id;
  const dataList = {
    title: "종목 추천 좀",
    multiId: multiId,
    user: "user",
    description: "종목추천 부탁드립니다",
    contentA: "전국민 주주시대 삼성전자",
    contentB: "주춤할때 담아야지 카카오",
    contentC: "정진이형 믿고 간다 셀트리온",
    contentD: "지구 좁다 우주로 가자 테슬라",
    contentE: "언제까지 주식이죠 비트코인",
    voteCntA: 1,
    voteCntB: 2,
    voteCntC: 3,
    voteCntD: 4,
    voteCntE: 5,
    date: "date",
    editedDate: "editedDate",
    completed: false,
    likeCnt: "0",
    commentCnt: "0",
    voted: true,
    liked: false,
  };

  if (dataList.voted === true) {
    return (
      <div>
        <div>
          <MultiVoted dataList={dataList} />
        </div>
        <div>
          <MultiComment dataList={dataList} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <MultiUnvoted dataList={dataList} />
      </div>
    );
  }
};

export default MultiDetail;
