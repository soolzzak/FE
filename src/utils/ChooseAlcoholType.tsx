import { AlcoholWater } from '../assets/svgs/AlcoholWater';
import { AlcoholBeer } from '../assets/svgs/AlcoholBeer';
import { AlcoholCocktail } from '../assets/svgs/AlcoholCocktail';
import { AlcoholSoju } from '../assets/svgs/AlcoholSoju';
import { AlcoholWine } from '../assets/svgs/AlcoholWine';
import { AlcoholTraditionalLiquor } from '../assets/svgs/AlcoholTraditionalLiquor';
import { AlcoholRum } from '../assets/svgs/AlcoholRum';
import { AlcoholTequila } from '../assets/svgs/AlcoholTequila';
import { AlcoholVodka } from '../assets/svgs/AlcoholVodka';
import { AlcoholWhisky } from '../assets/svgs/AlcoholWhisky';
import { AlcoholBrandy } from '../assets/svgs/AlcoholBrandy';

export const ChooseAlcoholType = ({
  alcohol,
  height,
  width,
}: {
  alcohol: number;
  height?: number;
  width?: number;
}) => (
  <>
    {alcohol === 0 && <AlcoholWater width={width} height={height} />}
    {alcohol >= 1 && alcohol <= 6 && (
      <AlcoholBeer width={width} height={height} />
    )}
    {alcohol >= 7 && alcohol <= 12 && (
      <AlcoholCocktail width={width} height={height} />
    )}
    {alcohol >= 13 && alcohol <= 18 && (
      <AlcoholSoju width={width} height={height} />
    )}
    {alcohol >= 19 && alcohol <= 24 && (
      <AlcoholWine width={width} height={height} />
    )}
    {alcohol >= 25 && alcohol <= 30 && (
      <AlcoholTraditionalLiquor width={width} height={height} />
    )}
    {alcohol >= 31 && alcohol <= 36 && (
      <AlcoholRum width={width} height={height} />
    )}
    {alcohol >= 37 && alcohol <= 42 && (
      <AlcoholTequila width={width} height={height} />
    )}
    {alcohol >= 43 && alcohol <= 48 && (
      <AlcoholVodka width={width} height={height} />
    )}
    {alcohol >= 49 && alcohol <= 54 && (
      <AlcoholWhisky width={width} height={height} />
    )}
    {alcohol >= 55 && <AlcoholBrandy width={width} height={height} />}
  </>
);
