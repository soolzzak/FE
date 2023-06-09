import { UseMutationResult, useMutation } from 'react-query';
import { toast } from 'react-toastify';
import {
  DetailUserProfile,
  ThumbDownHandler,
  ThumbUpHandler,
} from '../../api/mypage';
import { Like } from '../../assets/svgs/Like';
import { UnLike } from '../../assets/svgs/UnLike';
import { CategoryDropDown } from './CategoryDropDown';

interface ApiResponse1 {
  status: number;
  msg: string;
  data: DetailUserProfile;
}

export const RemoteUserSection = ({
  guestProfile,
  guestProfileMutation,
}: {
  guestProfile: DetailUserProfile;
  guestProfileMutation: UseMutationResult<
    ApiResponse1 | undefined,
    unknown,
    string,
    unknown
  >;
}) => {
  const thumbsUpMutation = useMutation(ThumbUpHandler, {
    onSuccess: () => {
      guestProfileMutation.mutate(guestProfile.userId);
    },
    onError: () => {
      toast.error('네트워크 에러로 좋아요를 실패했습니다');
    },
  });

  const thumbsDownMutation = useMutation(ThumbDownHandler, {
    onError: () => {
      toast.error('네트워크 에러로 싫어요를 실패했습니다');
    },
  });

  return (
    <section className="flex flex-row justify-center items-center">
      {/* <img
        alt="guestImg"
        src={guestProfile?.userImage}
        className="f-jic object-cover w-16 h-16 min-w-[64px] rounded-full mr-2"
      /> */}
      <CategoryDropDown guestProfile={guestProfile} />
      <div className="flex flex-col gap-2">
        <div className="xl:text-3xl font-semibold mr-4">
          {guestProfile.username}과 따로 또 같이 혼술하는 중!
        </div>
        <div className="h-2 rounded-lg bg-secondary-100 z-0 shadow-sm">
          <div
            className="h-2 rounded-full bg-secondary-200 shadow"
            style={{ width: `${guestProfile.alcohol}%` }}
          />
        </div>
      </div>
      <div className="flex flex-row gap-3 pl-5 pb-2 self-end">
        <Like
          onClick={() => thumbsUpMutation.mutate(guestProfile.userId)}
          isActive={guestProfile?.alcoholUp}
        />

        <UnLike
          onClick={() => thumbsDownMutation.mutate(guestProfile.userId)}
          isActive={guestProfile?.alcoholDown}
        />
      </div>
    </section>
  );
};
