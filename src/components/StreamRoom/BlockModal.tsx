import { CancelButton } from '../common/CancelButton';

export const BlockModal = ({ onClose }: { onClose: () => void }) => (
  <div className="grid grid-cols-1  justify-center items-center">
    <div className="w-[409px] h-[202px] relative  rounded-2xl bg-white flex flex-col justify-center items-center">
      <p className="font-semibold text-[24px]">카리나님을 차단하시겠어요?</p>
      <div className="flex justify-center items-center  gap-4 mt-10">
        <button
          onClick={onClose}
          type="button"
          className="border rounded-lg w-[139px] h-[44px] text-[16px] text-[#827676] "
        >
          아니요
        </button>
        <button
          type="button"
          className="border rounded-lg w-[139px] h-[44px] text-[16px] text-[#827676] "
        >
          네, 차단할게요
        </button>
      </div>
    </div>
    <CancelButton onClose={onClose} />
  </div>
);
