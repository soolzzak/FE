import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  DetailUserProfile,
  FollowHandler,
  TabUserList,
  ThumbDownHandler,
  ThumbUpHandler,
  getDetailUserProfile,
} from '../../api/mypage';
import { Like } from '../../assets/svgs/Like';
import { UnLike } from '../../assets/svgs/UnLike';
import { Water } from '../../assets/svgs/Water';
import { DetailDropdown } from './DetailDropdown';
import { CancelButton } from '../common/CancelButton';

export const DetailUserInfoModal = ({
  onClose,
  item,
}: {
  onClose: () => void;
  item: TabUserList;
}) => {
  const { data, isError, error } = useQuery(
    'detailUserInfo',
    () => getDetailUserProfile(item.userId),
    {
      refetchOnWindowFocus: false,
    }
  );

  // const { data: thumbup } = useQuery(
  //   'thumbup',
  //   () => ThumbUpHandler(item.userId),
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );

  const queryClient = useQueryClient();

  const [userinfo, setUserinfo] = useState<DetailUserProfile | undefined>();

  // const [currentFollow, setCurrentFollow] = useState<boolean>(
  //   userinfo?.follow || false
  // );

  console.log('얘', userinfo);

  useEffect(() => {
    if (data) {
      setUserinfo(data.data);
    }
  }, [data]);

  const handleFollowClick = async () => {
    const response = await FollowHandler(userinfo?.userId);
    if (response.status === 200) {
      await queryClient.invalidateQueries('mypageInfo');
      await queryClient.invalidateQueries('detailUserInfo');
    }
  };

  const handleThumbupClick = async () => {
    try {
      const response = await ThumbUpHandler(userinfo?.userId);
      if (response.status === 200) {
        await queryClient.invalidateQueries('detailUserInfo');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleThumbdownClick = async () => {
    const response = await ThumbDownHandler(userinfo?.userId);
    if (response.status === 200) {
      await queryClient.invalidateQueries('detailUserInfo');
    }
  };

  const upBackgroundColor = () =>
    userinfo?.alcoholUp ? 'bg-[#E5F9EA]' : 'bg-slate-300';

  const downBackgroundColor = () =>
    userinfo?.alcoholUp ? 'bg-[#E5F9EA]' : 'bg-slate-300';

  return (
    <div className="justify-center items-center">
      <div className="w-[542px] h-[230px] rounded-2xl bg-white flex flex-row px-6">
        <div className="flex flex-col justify-center items-center gap-2">
          <img
            alt=""
            className="min-w-[97px] h-[97px] rounded-full bg-[#9A9A9A] object-cover"
            src={userinfo?.userImage}
          />

          <button
            type="button"
            onClick={handleFollowClick}
            className={`w-[68px] h-[33px] border rounded-2xl ${
              userinfo?.follow
                ? 'bg-[#0BA332] border-[#0BA332] text-[#ffffff]'
                : 'border-[#0BA332] bg-[#E5F9EA] text-[#0BA332]'
            }`}
          >
            팔로우
          </button>
        </div>

        <div className="flex flex-col w-full ml-6 mr-6">
          <div className="flex flex-row justify-end mt-3">
            <DetailDropdown userinfo={userinfo} />
            <CancelButton onClose={onClose} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-2xl font-semibold">{userinfo?.username}</div>
            <div className="font-medium">{userinfo?.email}</div>
          </div>

          <div className="flex justify-between mt-8">
            <div className="flex flex-row justify-center items-center gap-2">
              <Water />
              <div className="text-[#0BA332] text-lg font-semibold">
                {userinfo?.alcohol}%
              </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-3 rounded-2xl mb-2">
              <Like
                onClick={handleThumbupClick}
                isActive={userinfo?.alcoholUp}
              />

              <UnLike
                onClick={handleThumbdownClick}
                isActive={userinfo?.alcoholDown}
              />
            </div>
          </div>

          <div className="w-full  bg-[#B6ECC4] rounded-full h-2.5 dark:bg-gray-700 ">
            <div
              className="bg-[#179638] h-2.5 rounded-full"
              style={{ width: `${userinfo?.alcohol}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
