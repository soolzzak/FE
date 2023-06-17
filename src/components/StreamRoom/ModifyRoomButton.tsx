import { useAtom } from 'jotai';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ToastContent, toast } from 'react-toastify';
import { Room, getRoom, modifyRoom } from '../../api/streamRoom';
import {
  categoryAtom,
  genderAtom,
  imageAtom,
  publicOrPrivateAtom,
  roomPasswordAtom,
  streamRoomInfoAtom,
  titleAtom,
} from '../../store/addRoomStore';
import { isOpenModifyRoomAtom } from '../../store/modalStore';
import { CommonButton } from '../common/CommonButton';

export type CreateRoomData = {
  title: string;
  category: string;
  genderSetting: string;
  isPrivate: boolean;
  roomPassword: string;
};

export const ModifyRoomButton = () => {
  const [image] = useAtom(imageAtom);
  const [title] = useAtom(titleAtom);
  const [category] = useAtom(categoryAtom);
  const [genderSetting] = useAtom(genderAtom);
  const [isPrivate] = useAtom(publicOrPrivateAtom);
  const [roomPassword] = useAtom(roomPasswordAtom);
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [, setIsClose] = useAtom(isOpenModifyRoomAtom);

  // const [roomInfo] = useAtom(streamRoomInfoAtom);
  const [, setModiftRoomIsOpen] = useAtom(isOpenModifyRoomAtom);
  const [roomInfo, setRoomInfo] = useAtom(streamRoomInfoAtom);

  const modifyRoomMutation = useMutation(modifyRoom, {
    onSuccess: () => {
      const newRoomInfo = { ...roomInfo, title };
      setRoomInfo(newRoomInfo as Room);
      setModiftRoomIsOpen(false);
      toast.success('방 수정 성공!');
    },
    onError: (error) => {
      toast('사용할 수 없는 단어가 있습니다.');
      toast.error(error as ToastContent);
    },
  });

  const onSubmit = () => {
    if (!title) return toast.error('제목을 입력해주세요!');
    const data = {
      title,
      category,
      genderSetting,
      isPrivate,
      roomPassword,
    };

    modifyRoomMutation.mutate({
      data,
      image,
      roomId: roomInfo?.roomId as unknown as string,
    });
  };

  return (
    <CommonButton
      buttonText="혼술짝 방 수정하기"
      clickHandler={onSubmit}
      enabled
      dimensions="text-xl py-5 mt-10 mb-[34px] rounded-[16px] w-2/3 self-center"
    />
  );
};
