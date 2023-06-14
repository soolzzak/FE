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

  const queryClient = useQueryClient();

  const [userinfo, setUserinfo] = useState<DetailUserProfile | undefined>();

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
    if (!userinfo?.alcoholDown) {
      try {
        const response = await ThumbUpHandler(userinfo?.userId);
        if (response.status === 200) {
          await queryClient.invalidateQueries('detailUserInfo');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleThumbdownClick = async () => {
    if (!userinfo?.alcoholUp) {
      const response = await ThumbDownHandler(userinfo?.userId);
      if (response.status === 200) {
        await queryClient.invalidateQueries('detailUserInfo');
      }
    }
  };

  return (
    <div className="justify-center items-center">
      <div className="md:w-[442.49px] md:h-[203px] w-[320px] h-[460px] rounded-2xl bg-white flex md:flex-row flex-col px-6">
        <div className="flex flex-col justify-center items-center gap-x-2 mt-7 md:mt-2">
          <img
            alt=""
            className="md:min-w-[97px] md:w-[97px] md:h-[97px] w-[170px] h-[170px] mt-3 rounded-full shadow bg-[#B6ECC4] object-cover"
            src={userinfo?.userImage}
          />

          <button
            type="button"
            onClick={handleFollowClick}
            className={`w-[66px] h-[29px] md:mt-5 md:mb-4 mt-5 border rounded-2xl ${
              userinfo?.follow
                ? 'bg-[#0BA332] border-[#0BA332] text-[#ffffff]'
                : 'border-[#0BA332] bg-[#E5F9EA] text-[#0BA332]'
            }`}
          >
            {userinfo?.follow ? '팔로잉' : '팔로우'}
          </button>
        </div>

        <div className="flex flex-col justify-center w-full md:ml-6 md:mr-6">
          <div className="flex flex-row justify-end">
            <div className="absolute md:mr-0 top-3 mr-5">
              <DetailDropdown userinfo={userinfo} />
            </div>
            <CancelButton onClose={onClose} />
          </div>

          <div className="flex flex-col md:mt-0 mt-5">
            <div className="text-2xl font-semibold">{userinfo?.username}</div>
            <div className="font-medium">{userinfo?.email}</div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="text-[#0BA332] text-lg font-semibold self-end mb-2">
              {userinfo?.alcohol}%
            </div>

            <div className="flex flex-row justify-center items-center gap-1 rounded-2xl mb-2">
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
