import { useEffect, useState } from "react";

const GameBoard = () => {
  const [point, setPoint] = useState(5);
  //5점으로 점수 기준을 만든 코드
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100));
  // (Math.floor(Math.random() * 100)) - 0이랑 100사이에 난수를 발생시킴. (랜덤함수사용)
  const [choiceNum, setChoiceNum] = useState("");
  //초기값 등록.
  const [hint, setHint] = useState("0 ~ 100 사이의 숫자를 맞춰보세요!");
  const onChangeChoice = (e) => {
    setChoiceNum(e.target.value);
  };
  // setChoiceNum(e.target.value) 이 코드로 고정되어있던 value={choiceNum} 을 변경할 수 있도록 만든다.
  const onClickCheck = () => {
    let checkNum = parseInt(choiceNum);

    if (isNaN(checkNum)) {
      setHint("숫자를 입력해주세요!");
      return;
    }
    //숫자가 아닌 문자를 입력했을때 NaN이 나오도록 하는 코드
    if (0 > checkNum || checkNum >= 100) {
      setHint("숫자를 잘못 입력하셨습니다.");
      return;
    }
    // if을 이용하여 값을 비교하는데 사용. ㅇ보다 작거나 100보다 큰경우 메세지 송출 코드

    if (randomNum === checkNum) {
      setHint("정답입니다!!! 랜덤값을 초기화 합니다.");
      //정답 코드.
      if (point > 0) {
        let savedPoint = localStorage.getItem("point");
        // 기존 점수 불러오는 코드
        localStorage.setItem("point", parseInt(savedPoint) + point);
        //저장하는 코드
      }
      setRandomNum(Math.floor(Math.random() * 100));
      // 정답을 맞추고 나면 랜덤결과 값을 초기화 하는 코드
      setChoiceNum("");
      // 정답을 맞추고 나면 입력창을 초기화 하는 코드.
      setPoint(5);
      // 점수를 주고나서 초기화.
    } else if (randomNum > choiceNum) {
      setHint(`정답은 ${choiceNum}보다 높은 숫자입니다.`);
      setPoint(point - 1);
    } else if (randomNum < choiceNum) {
      setHint(`정답은 ${choiceNum}보다 낮은 숫자입니다.`);
      setPoint(point - 1);
    }
  };
  //1.문자입력 2.0~100이외의 숫자는 오류를 일으킬 수 있다.

  useEffect(() => console.log(`랜덤 숫자는 ${randomNum}입니다.`), [randomNum]);
  //[randomNum] - 추적할 값. / (`랜덤 숫자는 ${randomNum}입니다.`) - 추적해낸 값.

  useEffect(
    () => console.log(`당신이 선택한 숫자는 ${choiceNum}입니다.`),
    [choiceNum]
  );
  useEffect(() => console.log(`현재포인트 ${point}`), [point]);
  return (
    <div className=" w-full grow flex flex-col justify-center items-center">
      <div className="mb-4 text-xl font-bold">{hint}</div>
      <div>
        <input
          className="border-2 rounded-lg px-4 py-2 focus:outline-yellow-300 shadow-lg"
          type="text"
          value={choiceNum}
          onChange={onChangeChoice}
        />
        <button
          onClick={onClickCheck}
          className="px-4 py-2 ml-2 rounded-lg border-2 border-yellow-300 text-yellow-300 shadow-lg"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
