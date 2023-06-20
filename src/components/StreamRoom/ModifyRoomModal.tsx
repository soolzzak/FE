import { useAtom } from 'jotai';
import { useQuery, useQueryClient } from 'react-query';
import { getRoom } from '../../api/streamRoom';
import { DeleteBtn } from '../../assets/svgs/DeleteBtn';
import { useModal } from '../../hooks/useModal';
import {
  handleTitleChangeAtom,
  streamRoomInfoAtom,
} from '../../store/addRoomStore';
import { isOpenModifyRoomAtom } from '../../store/modalStore';
import { CustomSelector } from '../common/CustomSelector';
import { DropdownSelector } from '../common/DropdownSelector';
import { ImageUploadAndView } from '../common/ImageUploadAndView';
import { ModalInput } from '../common/ModalInput';
import { OptionalFieldChange } from '../common/OptionalFieldChange';
import { ModifyRoomButton } from './ModifyRoomButton';

export const ModifyRoomModal = () => {
  const [, setIsOpenModifyRoom] = useAtom(isOpenModifyRoomAtom);

  const [, handleTitleChange] = useAtom(handleTitleChangeAtom);
  const [isOpenExit, onCloseExit] = useModal();

  const [roomInfo, setRoomInfo] = useAtom(streamRoomInfoAtom);

  return (
    <div className="relative f-col bg-white px-12 rounded-[20px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-9">
        <div className="w-[356px] h-full rounded-2xl bg-slate-400">
          <ImageUploadAndView roomImageUrl={roomInfo?.roomImageUrl} />
        </div>
        <div className="f-col gap-5">
          <ModalInput
            constraint={25}
            inputValue
            title="방 제목"
            // placeholderText="예시 : 분노의 질주 얘기하면서 같이 소주마셔요"
            placeholderText={
              roomInfo?.title ?? '예시 : 분노의 질주 얘기하면서 같이 소주마셔요'
            }
            inputType="text"
            autofocus
            handleInputChange={handleTitleChange}
          />
          <DropdownSelector category={roomInfo?.category} />
          <CustomSelector genderSetting={roomInfo?.genderSetting} />
          <OptionalFieldChange
            isPrivate={roomInfo?.isPrivate}
            roomPassword={roomInfo?.roomPassword}
          />
        </div>
      </div>

      <ModifyRoomButton />
      <div
        role="none"
        className="absolute right-3 top-3 hover:cursor-pointer"
        onClick={() => setIsOpenModifyRoom(false)}
      >
        <DeleteBtn />
      </div>

      <div>
        {isOpenExit && (
          <div className="fixed inset-0 z-50 f-jic-col">
            <div
              role="none"
              className="fixed inset-0"
              onClick={() => onCloseExit()}
            />
          </div>
        )}
      </div>
    </div>
  );
};
