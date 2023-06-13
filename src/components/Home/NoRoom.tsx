// import { useEffect, useState } from 'react';
// import { NoroomSoju } from '../../assets/svgs/NoroomSoju';
// import { NoroomBeer } from '../../assets/svgs/NoroomBeer';
// import { NoroomWine } from '../../assets/svgs/NoroomWine';

// export const NoRoom = () => {
//   const [isButtonVisible, setIsButtonVisible] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setIsButtonVisible(true);
//     }, 2000);

//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <div className=" w-full flex flex-col items-center justify-center mt-32">
//       <div className="mr-8">
//         <NoroomSoju />
//       </div>
//       <NoroomBeer />
//       <NoroomWine />
//       <div>
//         <p className="text-5xl font-bold mb-5">아직 개설된 방이 없어요!</p>
//         <p className="text-4xl font-semibold text-[#646464]">
//           혼술짝 방 만들고 가볍게 술 한잔 할까요?
//         </p>
//       </div>
//       {isButtonVisible && (
//         <button
//           type="button"
//           className="bg-[#179638] text-[#FFFFFF] rounded-lg w-[189px] h-[36px]"
//         >
//           혼술짝 방만들기
//         </button>
//       )}
//     </div>
//   );
// };
