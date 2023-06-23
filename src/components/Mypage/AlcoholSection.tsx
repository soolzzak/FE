/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { DetailUserProfile, FindUser } from '../../api/mypage';
import chart from '../../assets/images/Chart.png';
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
import { LevelInfoBeer } from '../../assets/svgs/LevelInfoBeer';
import { MypageInfo } from '../../assets/svgs/MypageInfo';

export const AlcoholSection = ({ alcohol }: { alcohol: number }) => {
  const [toastHover, setToastHover] = useState(false);

  return (
    <div className="basis-1/2 bg-[#ffffff] rounded-3xl flex flex-col gap-y-2 shadow">
      <div className="p-8">
        <div className="flex flex-row">
          <p className="font-bold mb-2 mr-2">도수 레벨</p>
          <div
            className="mt-0.5"
            onMouseOver={() => setToastHover(true)}
            onMouseOut={() => setToastHover(false)}
          >
            <MypageInfo />
            {toastHover ? (
              <div className="absolute flex flex-col w-[656px] h-[202px] py-2 rounded-2xl shadow-lg bg-[#ffffff]">
                <div className="flex flex-row items-center px-5">
                  <LevelInfoBeer />
                  <p className="text-[#454545] text-base font-bold ml-3">
                    도수 레벨?
                  </p>
                </div>
                <p className="text-sm text-[#969696] font-semibold px-3 ml-3 mt-2">
                  다양한 사람들과 교류하며 도수 레벨을 서로 평가할 수 있어요
                  <br />
                  도수레벨에 따라 바뀌는 아이콘을 확인해보세요 !
                </p>
                <img src={chart} alt="" />
              </div>
            ) : null}
          </div>
        </div>
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
            레벨!&nbsp;
            {(() => {
              if (alcohol === 0) {
                return '소주레벨까지 1도 남았어요 :)';
              }
              if (alcohol >= 1 && alcohol <= 6) {
                return `칵테일레벨까지 ${alcohol - 7}도 남았어요 :)`;
              }
              if (alcohol >= 7 && alcohol <= 12) {
                return `소주레벨까지 ${13 - alcohol}도 남았어요 :)`;
              }
              if (alcohol >= 13 && alcohol <= 18) {
                return `와인레벨까지 ${19 - alcohol}도 남았어요 :)`;
              }
              if (alcohol >= 19 && alcohol <= 24) {
                return `전통주레벨까지 ${25 - alcohol}도 남았어요 :)`;
              }
              if (alcohol >= 25 && alcohol <= 30) {
                return `럼레벨까지 ${31 - alcohol}도 남았어요 :)`;
              }
              if (alcohol >= 31 && alcohol <= 36) {
                return `테킬라레벨까지 ${37 - alcohol}도 남았어요 :)`;
              }
              if (alcohol >= 37 && alcohol <= 42) {
                return `보드카레벨까지 ${43 - alcohol}도 남았어요 :)`;
              }
              if (alcohol >= 43 && alcohol <= 48) {
                return `위스키레벨까지 ${49 - alcohol}도 남았어요 :)`;
              }
              if (alcohol >= 49 && alcohol <= 54) {
                return `브랜디레벨까지 ${55 - alcohol}도 남았어요 :)`;
              }
              return '당신은 진정한 혼술짝 술꾼! 👏';
            })()}{' '}
          </p>
        </div>
      </div>
    </div>
  );
};
