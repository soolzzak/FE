import React from 'react';

export const StreamRoom2 = () => {
  const a = 'b';
  return (
    <div className="w-full">
      <div className="flex flex-col min-w-[80px]">
        <div className="bg-white rounded-3xl flex flex-col w-full mt-32 max-w-[1200px] mx-auto">
          <div className="flex w-full justify-between">
            <div>여기 이미지랑 프로그래스바</div>

            <div>여기 글제목</div>
          </div>

          <div className="flex flex-row justify-between">
            <div>
              <div>여기 동영상</div>
            </div>
            <div>
              <div>여기 동영상2</div>
              <div>여기 버튼들</div>
            </div>
          </div>
        </div>
      </div>
    </div>

// <div className="flex flex-col rounded-3xl p-5">
// <div className="bg-white mx-10 py-8 px-16 rounded-3xl">
//   <div className="flex justify-center">
//     <div className="flex flex-row w-full justify-between mb-5">
//       {guestProfile && (
//         <RemoteUserSection
//           guestProfile={guestProfile}
//           guestProfileMutation={guestProfileMutation}
//         />
//       )}
//       <div className="flex items-center text-xl xl:text-[32px] font-semibold">
//         {roomInfo?.title}
//       </div>
//     </div>
//   </div>
//   <div className="flex justify-center">
//     <div className="gap-5 grid grid-cols-9 grid-rows-6 h-[80vh] w-full">
//       <div className="col-span-6 row-span-6 flex flex-col justify-between gap-5">
//         {guestIn ? (
//           <video
//             ref={remoteVideoRef}
//             autoPlay
//             muted
//             className="bg-black w-full h-[90%] object-cover rounded-3xl"
//           />
//         ) : (
//           <WaitingGuestRef />
//         )}
//         <div className="h-[10%] flex items-center justify-center gap-4 rounded-xl">
//           <div
//             role="none"
//             onClick={micToggleHandler}
//             className={`iconStyle ${
//               micOn ? 'bg-[#C0C0C0]' : 'bg-[#808080]'
//             } `}
//           >
//             {micOn ? (
//               <LuMic className="text-3xl text-white" />
//             ) : (
//               <LuMicOff className="text-3xl text-white" />
//             )}
//           </div>
//           <div
//             role="none"
//             onClick={videoToggleHandler}
//             className={`iconStyle ${
//               monitorOn ? 'bg-[#C0C0C0]' : 'bg-[#808080]'
//             } `}
//           >
//             {monitorOn ? (
//               <LuMonitor className="text-3xl text-white" />
//             ) : (
//               <LuMonitorOff className="text-3xl text-white" />
//             )}
//           </div>

//           <div className="iconStyle bg-[#C0C0C0]">
//             <ConfigDropDown setIsOpenKickout={setIsOpenKickout} />
//           </div>

//           <Exit setIsOpenLeaveRoom={setIsOpenLeaveRoom} />
//         </div>
//       </div>

//       <div className="w-full h-full col-span-3 row-span-4 rounded-xl">
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           className="w-full h-full object-cover rounded-3xl"
//         />
//       </div>
//       <div className="col-span-3 row-span-2 rounded-xl flex flex-col justify-between gap-4">
//         <div className="border border-[#D9D9D9] h-1/3 rounded-xl flex justify-center">
//           <span className="w-48 h-full flex items-center xl:text-xl font-semibold gap-4">
//             <Camera />
//             함께 사진찍기
//           </span>
//         </div>
//         <div className="border border-[#D9D9D9] h-1/3 rounded-xl flex justify-center">
//           <span className="w-48 h-full flex items-center xl:text-xl  font-semibold gap-4 ">
//             <Game />
//             게임하기
//           </span>
//         </div>
//         <div className="border border-[#D9D9D9] h-1/3 rounded-xl flex justify-center">
//           <span className="w-48 h-full flex items-center xl:text-xl  font-semibold gap-4">
//             <Youtube />
//             유튜브 같이보기
//           </span>
//         </div>
//         <button type="button" onClick={sendToastMessage}>
//           Toast
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
// <Modal
//   isOpen={isOpenLeaveRoom}
//   onClose={() => setIsOpenLeaveRoom(false)}
//   hasOverlay
// >
//   <LeaveRoomModal />
// </Modal>

// <Modal isOpen={isOpenKickout} onClose={onCloseKickout}>
//   <KickoutModal onClose={onCloseKickout} />
// </Modal>
// </div>
  );
};
