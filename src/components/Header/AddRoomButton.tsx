import { useAtom } from 'jotai';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ToastContent, toast } from 'react-toastify';
import { createRoom } from '../../api/main';
import {
  categoryAtom,
  genderAtom,
  imageAtom,
  publicOrPrivateAtom,
  roomPasswordAtom,
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

export const AddRoomButton = ({ closeModal }: { closeModal: () => void }) => {
  const [image] = useAtom(imageAtom);
  const [title] = useAtom(titleAtom);
  const [category] = useAtom(categoryAtom);
  const [genderSetting] = useAtom(genderAtom);
  const [isPrivate] = useAtom(publicOrPrivateAtom);
  const [roomPassword] = useAtom(roomPasswordAtom);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createRoomMutation = useMutation(createRoom, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('chatrooms');
      closeModal();
      navigate(`/room/${data.data.roomId}`);
      toast.success('방 반들기 성공!');
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
    createRoomMutation.mutate({ data, image });
  };
  return (
    <CommonButton
      buttonText="혼술짝 방만들기"
      clickHandler={onSubmit}
      dimensions="mt-7 mb-3 w-full h-14 self-center"
    />
  );
};
