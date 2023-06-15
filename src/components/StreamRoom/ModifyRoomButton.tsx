import { useAtom } from 'jotai';
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

export type CreateRoomData = {
  title: string;
  category: string;
  genderSetting: string;
  isPrivate: boolean;
  roomPassword: string;
};

export const ModifyRoomButton = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const [image] = useAtom(imageAtom);
  const [title] = useAtom(titleAtom);
  const [category] = useAtom(categoryAtom);
  const [genderSetting] = useAtom(genderAtom);
  const [isPrivate] = useAtom(publicOrPrivateAtom);
  const [roomPassword] = useAtom(roomPasswordAtom);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [roomInfo] = useAtom(streamRoomInfoAtom);

  const modifyRoomMutation = useMutation(modifyRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries('chatrooms');
      closeModal();
      //   navigate(`/room/${data.data.roomId}`);
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
    console.log('이미지', image);
    console.log('데이터', data);
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
