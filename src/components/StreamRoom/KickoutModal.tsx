import { CancelButton } from '../common/CancelButton';

export const KickoutModal = ({ onClose, sendKickMessage, username }: { onClose: () => void, sendKickMessage: () => void, username:string }) => (
    <div className="grid grid-cols-1 justify-center items-center">
      <div className="w-[409px] h-[202px] relative  rounded-2xl bg-white flex flex-col justify-center items-center">
        <p className="font-semibold text-[24px]">{username}을 강퇴하시겠어요?</p>
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={onClose}
            type="button"
            className="border border-[#6A6A6A] font-semibold rounded-lg w-[139px] h-[44px] text-[16px] text-[#6A6A6A] hover:text-[#dcdcdc]"
          >
            아니요
          </button>
          <button
            type="button"
            className="border font-semibold rounded-lg w-[139px] h-[44px] text-[16px] text-[#FF4444] border-[#FF4444] bg-[#FFF0F0] hover:bg-[#FF4444] hover:text-[#FFF0F0] transition-colors duration-200 ease-in-out"
            onClick={() => {
              sendKickMessage();
              onClose();
            }}
          >
            네, 강퇴할게요
          </button>
        </div>
      </div>
      <CancelButton onClose={onClose} />
    </div>
  );
