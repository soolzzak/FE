export const AlcoholSection = () => (
  <div className="basis-1/2 bg-[#D9D9D9] rounded-3xl flex flex-col p-8 gap-y-2">
    <p className="font-semibold">도수 레벨</p>
    <p>다양한 사람들과 교류하고 도수레벨을 올려보세요!</p>
    <div className="flex flex-row items-end justify-end">
      <p className="place-items-end font-bold text-4xl mr-5">77℃</p>
      <div className="w-24 h-24 rounded-full bg-[#9A9A9A] mr-4 " />
    </div>
    {/* 프로그래스바 */}
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-5">
      <div
        className="bg-[#9A9A9A] h-2.5 rounded-full"
        style={{ width: '77%' }}
      />
    </div>
    <div className="flex flex-row items-center mt-4">
      <div className="w-4 h-4 rounded-full bg-[#9A9A9A] mr-2 " />
      <p>당신은 지금 소주레벨!</p>
    </div>
  </div>
);
