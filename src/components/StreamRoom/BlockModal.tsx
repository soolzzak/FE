import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { BlockHandler, DetailUserProfile } from '../../api/mypage';
import { CancelButton } from '../common/CancelButton';

export const BlockModal = ({
  onClose,
  userinfo,
}: {
  onClose: () => void;
  userinfo: DetailUserProfile;
}) => {
  const queryClient = useQueryClient();

  const handleBlockClick = async () => {
    try {
      const response = await BlockHandler(userinfo?.userId);
      if (response.message === 'Successfully unblocked the user.')
        toast('차단이 해제되었습니다.');
      else if (response?.message === 'Successfully blocked the user.')
        toast('차단 되었습니다.');
      if (response.status === 200) {
        await queryClient.invalidateQueries('mypageInfo');
        await queryClient.invalidateQueries('detailUserInfo');
      }
    } catch (err) {
      console.log(err);
    }
    onClose();
  };

  return (
    <div className="grid grid-cols-1  justify-center items-center">
      <div className="md:w-[409px] md:h-[202px] w-[380px] h-[202px] relative  rounded-2xl bg-white flex flex-col justify-center items-center">
        <p className="font-semibold text-[24px]">
          {userinfo?.username}님을{' '}
          {userinfo?.block ? '차단 해제하시겠어요?' : '차단하시겠어요?'}
        </p>
        <div className="flex justify-center items-center  gap-4 mt-10">
          <button
            onClick={onClose}
            type="button"
            className="border-[#C1C1C1] border bg-[#FFFFFF] rounded-lg w-[139px] h-[44px] text-[16px] text-[#7B7B7B] "
          >
            취소
          </button>
          <button
            onClick={handleBlockClick}
            type="button"
            className="border border-[#FF4444] bg-[#FFF0F0] rounded-lg w-[139px] h-[44px] text-[16px] text-[#FF4444] "
          >
            {userinfo?.block ? '차단 해제' : '차단'}
          </button>
        </div>
      </div>
      <CancelButton onClose={onClose} />
    </div>
  );
};
