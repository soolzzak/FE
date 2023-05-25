export const StreamRoom = () => {
  return (
    <div className="flex flex-col h-screen p-5 m-5 rounded-3xl bg-blue-50">
      <div className="basis-1/12  flex justify-between">
        <p className="text-[20px]">카리나님과 따로 또 같이 혼술하는 중!</p>
        <p className="font-semibold text-[32px]">얘기하면서 같이 소주마셔요!</p>
      </div>
      <div className="basis-11/12 bg-red-50 grid grid-cols-5 grid-rows-6 gap-3">
        <div className="col-span-3 row-span-6 bg-yellow-50">상대방</div>
        <div className="col-span-2 row-span-3 bg-yellow-50">나</div>
        <div className="col-span-2 row-span-2 bg-yellow-50">채팅</div>
        <div className="col-span-2 row-span-1 bg-yellow-50">텍스트보내기</div>
      </div>
    </div>
  );
};
