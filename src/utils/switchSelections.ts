export const tabList = [
  '전체',
  '🎟 영화/드라마 ',
  '🥨 맛집/여행',
  '⚽ 스포츠/게임',
  '🎈 오늘하루',
  '🔮 고민상담',
  '🙌  자유방',
];

export const selections = [
  'ALL',
  'MOVIE_DRAMA',
  'FOOD_TRAVEL',
  'SPORTS_GAME',
  'ABOUT_TODAY',
  'COUNSELING',
  'GENERAL',
];
export const categorySelection = (chatCategory: string) => {
  let result = null;
  switch (chatCategory) {
    case 'ALL':
      result = '전체';
      break;
    case 'MOVIE_DRAMA':
      result = '🎟 영화/드라마';
      break;
    case 'FOOD_TRAVEL':
      result = '🥨 맛집/여행';
      break;
    case 'SPORTS_GAME':
      result = '⚽ 스포츠/게임';
      break;
    case 'ABOUT_TODAY':
      result = '🎈 오늘하루';
      break;
    case 'COUNSELING':
      result = '🔮 고민상담';
      break;
    case 'GENERAL':
      result = '🙌 자유방';
      break;
    default:
      break;
  }
  return result;
};
export const genderSelection = (chatCategory: string) => {
  let result;
  switch (chatCategory) {
    case 'ANY':
      result = '누구나';
      break;
    case 'MALE':
      result = '남자만';
      break;
    case 'FEMALE':
      result = '여자만';
      break;
    default:
      break;
  }
  return result;
};

export const errorMessageConvert = (chatCategory: string) => {
  let result = null;
  switch (chatCategory) {
    case 'The username contains forbidden words. Please choose a different username.':
      result = '사용할 수 없는 단어가 있습니다';
      break;
    case 'The username already exist.':
      result = '중복된 닉네임입니다.';
      break;
    case 'The room title contains forbidden words. Please use different room title.':
      result = '사용할 수 없는 단어가 있습니다';
      break;
    case 'SPORTS_GAME':
      result = '⚽ 스포츠/게임';
      break;
    case 'ABOUT_TODAY':
      result = '🎈 오늘하루';
      break;
    case 'COUNSELING':
      result = '🔮 고민상담';
      break;
    case 'GENERAL':
      result = '🙌 자유방';
      break;
    default:
      break;
  }
  return result;
};
