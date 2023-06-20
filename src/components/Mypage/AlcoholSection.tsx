import { AlcoholBeer } from '../../assets/svgs/AlcoholBeer';
import { AlcoholBrandy } from '../../assets/svgs/AlcoholBrandy';
import { AlcoholCocktail } from '../../assets/svgs/AlcoholCocktail';
import { AlcoholRum } from '../../assets/svgs/AlcoholRum';
import { AlcoholSoju } from '../../assets/svgs/AlcoholSoju';
import { AlcoholTequila } from '../../assets/svgs/AlcoholTequila';
import { AlcoholTraditionalLiquor } from '../../assets/svgs/AlcoholTraditionalLiquor';
import { AlcoholVodka } from '../../assets/svgs/AlcoholVodka';
import { AlcoholWater } from '../../assets/svgs/AlcoholWater';
import { AlcoholWhisky } from '../../assets/svgs/AlcoholWhisky';
import { AlcoholWine } from '../../assets/svgs/AlcoholWine';

export const AlcoholSection = ({ alcohol }: { alcohol: number }) => (
  <div className="basis-1/2 bg-[#ffffff] rounded-3xl flex flex-col gap-y-2 shadow">
    <div className="p-8">
      <p className="font-bold mb-2">도수 레벨</p>
      <p>다양한 사람들과 교류하고 도수레벨을 올려보세요!</p>
    </div>
    <div className="px-8 ">
      <div className="flex flex-row items-end justify-end mr-5">
        <p className="place-items-end font-bold text-4xl mr-2 mb-2 text-[#179638]">
          {alcohol}%
        </p>

        {(() => {
          if (alcohol === 0) {
            return <AlcoholWater />;
          }
          if (alcohol >= 1 && alcohol <= 6) {
            return <AlcoholBeer />;
          }
          if (alcohol >= 7 && alcohol <= 12) {
            return <AlcoholCocktail />;
          }
          if (alcohol >= 13 && alcohol <= 18) {
            return <AlcoholSoju />;
          }
          if (alcohol >= 19 && alcohol <= 24) {
            return <AlcoholWine />;
          }
          if (alcohol >= 25 && alcohol <= 30) {
            return <AlcoholTraditionalLiquor />;
          }
          if (alcohol >= 31 && alcohol <= 36) {
            return <AlcoholRum />;
          }
          if (alcohol >= 37 && alcohol <= 42) {
            return <AlcoholTequila />;
          }
          if (alcohol >= 43 && alcohol <= 48) {
            return <AlcoholVodka />;
          }
          if (alcohol >= 49 && alcohol <= 54) {
            return <AlcoholWhisky />;
          }
          return <AlcoholBrandy />;
        })()}
      </div>
      <div className="w-full bg-[#B6ECC4] rounded-full h-2.5">
        <div
          className="bg-[#179638] h-2.5 rounded-full"
          style={{ width: `${alcohol}%` }}
        />
      </div>
      <div className="flex flex-row items-center justify-self-end mb-5 mt-5">
        <div className="w-4 h-4 rounded-full bg-[#179638] mr-2" />
        <p>
          당신은 지금{' '}
          {(() => {
            if (alcohol === 0) {
              return '물';
            }
            if (alcohol >= 1 && alcohol <= 6) {
              return '맥주';
            }
            if (alcohol >= 7 && alcohol <= 12) {
              return '칵테일';
            }
            if (alcohol >= 13 && alcohol <= 18) {
              return '소주';
            }
            if (alcohol >= 19 && alcohol <= 24) {
              return '와인';
            }
            if (alcohol >= 25 && alcohol <= 30) {
              return '전통주';
            }
            if (alcohol >= 31 && alcohol <= 36) {
              return '럼';
            }
            if (alcohol >= 37 && alcohol <= 42) {
              return '테킬라';
            }
            if (alcohol >= 43 && alcohol <= 48) {
              return '보드카';
            }
            if (alcohol >= 49 && alcohol <= 54) {
              return '위스키';
            }
            return '브랜디';
          })()}{' '}
          레벨!
        </p>
      </div>
    </div>
  </div>
);
