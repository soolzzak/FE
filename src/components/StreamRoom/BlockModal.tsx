import { useQueryClient } from 'react-query';
import { BlockHandler, DetailUserProfile } from '../../api/mypage';
import { CancelButton } from '../common/CancelButton';

export const BlockModal = ({
  onClose,
  userinfo,
}: {
  onClose: () => void;
  userinfo?: DetailUserProfile;
}) => {
  const queryClient = useQueryClient();

  const handleBlockClick = async () => {
    try {
      const response = await BlockHandler(userinfo?.userId);
      if (response.status === 200) {
        await queryClient.invalidateQueries('mypageInfo');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-1  justify-center items-center">
      <div className="w-[409px] h-[202px] relative  rounded-2xl bg-white flex flex-col justify-center items-center">
        <p className="font-semibold text-[24px]">
          {userinfo?.username}님을{' '}
          {userinfo?.block ? '차단 해제하시겠어요?' : '차단하시겠어요?'}
        </p>
        <div className="flex justify-center items-center  gap-4 mt-10">
          <button
            onClick={onClose}
            type="button"
            className="border rounded-lg w-[139px] h-[44px] text-[16px] text-[#827676] "
          >
            취소
          </button>
          <button
            onClick={handleBlockClick}
            type="button"
            className="border rounded-lg w-[139px] h-[44px] text-[16px] text-[#827676] "
          >
            {userinfo?.block ? '차단 해제' : '차단'}
          </button>
        </div>
      </div>
      <CancelButton onClose={onClose} />
    </div>
  );
};
