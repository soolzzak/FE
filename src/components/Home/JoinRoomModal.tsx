export const JoinRoomModal = ({
    setJoinOpen, setWatingOpen
  }: {
    setJoinOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setWatingOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
  const a = 'b';
  return (
    <div className="flex w-[1050px] h-[544.31px] bg-[#FFFFFF] rounded-[36px]">
      <div className="w-3/5 flex flex-col items-center justify-center">
        <div className="text-2xl h-1/6 font-bold">
          {`분노의질주'`} 얘기하면서 같이 소주마셔요!
        </div>

        <div className="w-[520.78px] h-4/6 bg-[#D9D9D9] rounded-[20px]">
          내얼굴
        </div>
      </div>

      <div className="w-2/5">
        <div className="flex h-1/6 justify-end items-center mt-6 mr-10">
          <div className="flex-col">
            <div className="w-11 h-4 bg-[#D9D9D9] mr-5" />
            <div className="text-xl font-bold text-[#4A4A4A]">77 °C</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#D9D9D9]" />
        </div>
        <div className="h-4/6 flex flex-col items-center justify-end">
          <div className="flex items-center justify-center rounded-xl w-64 h-12 bg-[#D9D9D9] text-[18px] mb-5">
            누르면 3초 후에 입장해요😊
          </div>

          <button
            type="button"
            className="w-72 h-16 bg-[#9A9A9A] rounded-2xl text-[#FFFFFF] text-[22px] font-bold hover:bg-opacity-80"
            onClick={() => {
                setJoinOpen(false)
                setWatingOpen(true)
            }}
          >
            혼술짝 방 입장하기
          </button>
        </div>
      </div>
    </div>
  );
};
