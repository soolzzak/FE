import { SetStateAction, useAtom } from 'jotai';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ToastContent, toast } from 'react-toastify';
import { modifyRoom } from '../../api/streamRoom';
import {
  categoryAtom,
  genderAtom,
  imageAtom,
  publicOrPrivateAtom,
  roomPasswordAtom,
  streamRoomInfoAtom,
  titleAtom,
} from '../../store/addRoomStore';
import { CommonButton } from '../common/CommonButton';
import { isOpenModifyRoomAtom } from '../../store/modalStore';

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [,setIsClose] = useAtom(isOpenModifyRoomAtom)

  const [roomInfo] = useAtom(streamRoomInfoAtom);

  //   const [, setIsOpenModifyRoom] = useAtom(isOpenModifyRoomAtom);
  const [, setModiftRoomIsOpen] = useAtom(isOpenModifyRoomAtom);

  const modifyRoomMutation = useMutation(modifyRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries('chatrooms');
      setModiftRoomIsOpen(false);

      toast.success('방 수정 성공!');
    },
    onError: (error) => {
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

    // const roomId = roomInfo?.roomId;
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
      dimensions="text-xl py-6 mt-7 mb-[34px] w-2/3 self-center"
    />
  );
};
