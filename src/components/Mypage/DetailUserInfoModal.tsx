import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import {
  DetailUserProfile,
  FollowHandler,
  TabUserList,
  ThumbUpHandler,
  ThumbDownHandler,
  getDetailUserProfile,
} from '../../api/mypage';
import { Thumbdown } from '../../assets/svgs/Thumbdown';
import { Thumbup } from '../../assets/svgs/Thumbup';
import { Water } from '../../assets/svgs/Water';
import { DetailDropdown } from './DetailDropdown';

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

  const [currentFollow, setCurrentFollow] = useState<boolean>(
    userinfo?.follow || false
  );

  console.log('얘', userinfo);

  useEffect(() => {
    if (data) {
      setUserinfo(data.data);
    }
  }, [data]);

  const [isThumbupActive, setThumbupActive] = useState(() => false);
  const [isThumbdownActive, setThumbdownActive] = useState(false);

  const handleFollowClick = async () => {
    const response = await FollowHandler(userinfo?.userId);
    if (response.status === 200) {
      await queryClient.invalidateQueries('mypageInfo');
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

  return (
    <div className="justify-center items-center">
      <div className="w-[542px] h-[230px] rounded-2xl bg-white flex flex-row p-6">
        <div className="flex flex-col justify-center items-center gap-2">
          <img
            alt=""
            className="min-w-[97px] h-[97px] rounded-full bg-[#9A9A9A]"
          />
          <button
            type="button"
            onClick={handleFollowClick}
            className={`w-[68px] h-[33px] border-2 rounded-2xl ${
              currentFollow
                ? 'bg-[#0BA332] hover:bg-primary-100 transition duration-300 text-[#ffffff]'
                : 'border-gray-400 bg-[#E5F9EA] text-[#0BA332]'
            }  `}
          >
            팔로우
          </button>
        </div>

        <div className="flex flex-col w-full ml-6">
          <div className="self-end">
            <DetailDropdown userinfo={userinfo} />
          </div>
          <div className="flex flex-row justify-between  ">
            <div className="text-2xl">{userinfo?.username}</div>
            {/* <Menu /> */}
          </div>

          <div>{userinfo?.email}</div>

          <div className="flex justify-between mt-10 ">
            <div className="flex flex-row justify-center items-center gap-2">
              <Water />
              <div>{userinfo?.alcohol}%</div>
            </div>
            <div className="flex flex-row justify-center items-center w-[95px] h-[33px]  gap-3 border-2 rounded-2xl bg-primary-50 text-primary-200 border-primary-200 hover:bg-primary-100 transition duration-300">
              <div>
                <Thumbup
                  onClick={handleThumbupClick}
                  isActive={userinfo?.alcoholUp}
                />
              </div>
              <div>
                <Thumbdown
                  onClick={handleThumbdownClick}
                  isActive={userinfo?.alcoholDown}
                />
              </div>
            </div>
          </div>

          <div className="w-full  bg-[#B6ECC4] rounded-full h-2.5 dark:bg-gray-700 mt-2">
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
