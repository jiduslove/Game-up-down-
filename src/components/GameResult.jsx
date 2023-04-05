const GameResult = () => {
  const point = localStorage.getItem("point") | 0;

  return (
    <div className="bg-green-300 w-full grow flex flex-col justify-end items-center text-white pb-8 shadow-green-300 shadow-lg">
      <div className="text-8xl font-black">Up & Down</div>
      <div className="text-2xl">현재 점수 : {point}</div>
    </div>
  );
};

export default GameResult;
