import { Soju } from '../../assets/svgs/Soju';

export const AlcoholSection = ({ alcohol }: { alcohol: number }) => (
  <div className="basis-1/2 bg-[#ffffff] rounded-3xl flex flex-col gap-y-2">
    <div className="p-8">
      <p className="font-bold">도수 레벨</p>
      <p>다양한 사람들과 교류하고 도수레벨을 올려보세요!</p>
    </div>
    <div className="px-8 ">
      <div className="flex flex-row items-end justify-end mr-5 mb-5">
        <p className="place-items-end font-bold text-4xl mr-5 text-[#179638]">
          {alcohol}%
        </p>
        <Soju />
      </div>
      <div className="w-full bg-[#B6ECC4] rounded-full h-2.5 dark:bg-gray-700 ">
        <div
          className="bg-[#179638] h-2.5 rounded-full"
          style={{ width: `${alcohol}%` }}
        />
      </div>
      <div className="flex flex-row items-center justify-self-end mb-5 mt-5">
        <div className="w-4 h-4 rounded-full bg-[#179638] mr-2 " />
        <p>당신은 지금 소주레벨!</p>
      </div>
    </div>
  </div>
);
