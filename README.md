# 개미들의 곡소리 FRONT-END

## Git commit message rule

![https://blog.kakaocdn.net/dn/mCPCF/btraGOpkmjL/ukdxuLYL8TWsgmrHkQe6tk/img.png](https://blog.kakaocdn.net/dn/mCPCF/btraGOpkmjL/ukdxuLYL8TWsgmrHkQe6tk/img.png)

- add : 새로운 파일 추가
- feat : 새로운 기능 추가
- fix : 오류 수정
- edit : 기능 수정
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- refactor : 코드 리펙토링
- test : 테스트 코드, 리펙토링 테스트 코드 추가
- chore : 빌드 업무 수정, 패키지 매니저 수정

## Coding convention

Airbnb의 React/JSX 스타일 가이드를 따릅니다.

[GitHub - parksb/javascript-style-guide: Airbnb JavaScript 스타일 가이드](https://github.com/ParkSB/javascript-style-guide)

✅ **필수!!!** ✅

1. 변수명은 camel case 적용하기!! (단어가 합쳐진 부분마다 맨 처음 글자를 대문자로 표기.. )

```jsx
const onClickBtn = () => {
  alert("버튼 클릭됨!");
};
```

1. ESLint, Prettier extension을 설치해서 코드 스타일, 포맷 맞추기
2. useState, useEffect 등 hooks API는 import해서 사용!

- 예시) useState의 경우...
  ```jsx
  const [comment, setComment] = React.useState(); // React. 호출이 중복됨!!
  const [comment2, setComment3] = React.useState();
  const [comment2, setComment3] = React.useState();
  ```
  ```jsx
  import { useState } from "react";

  // 한번만 import하면 반복되는 React. 호출을 줄일 수 있음.
  const [comment, setComment] = useState();
  const [comment2, setComment3] = useState();
  const [comment2, setComment3] = useState();
  ```

## Import 순서
- react
- package
- (공백 한줄)
- components
- elements
- redux modules