export const AlcoholSection = ({ alcohol }: { alcohol: number }) => (
  <div className="basis-1/2 bg-[#ffffff] rounded-3xl flex flex-col p-8 gap-y-2">
    <p className="font-bold">도수 레벨</p>
    <p>다양한 사람들과 교류하고 도수레벨을 올려보세요!</p>
    <div className="flex flex-row items-end justify-end">
      <p className="place-items-end font-bold text-4xl mr-5">{alcohol}%</p>
      <div className="w-24 h-24 rounded-full bg-[#9A9A9A] mr-4 " />
    </div>
    {/* 프로그래스바 */}
    <div className="w-full bg-[#B6ECC4] rounded-full h-2.5 mt-5">
      <div
        className="bg-[#179638] h-2.5 rounded-full"
        style={{ width: `${alcohol}%` }}
      />
    </div>
    <div className="flex flex-row items-center mt-4">
      <div className="w-4 h-4 rounded-full bg-[#B6ECC4] mr-2 " />
      <p>당신은 지금 소주레벨!</p>
    </div>
  </div>
);
