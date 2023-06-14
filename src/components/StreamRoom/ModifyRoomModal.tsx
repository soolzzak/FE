import { useAtom } from 'jotai';
import { CancelButton } from '../common/CancelButton';
import { handleTitleChangeAtom } from '../../store/addRoomStore';
import { useModal } from '../../hooks/useModal';
import { ImageUploadAndView } from '../common/ImageUploadAndView';
import { ModalInput } from '../common/ModalInput';
import { DropdownSelector } from '../common/DropdownSelector';
import { CustomSelector } from '../common/CustomSelector';
import { OptionalFieldChange } from '../common/OptionalFieldChange';
import { AddRoomButton } from '../Header/AddRoomButton';
import { DeleteBtn } from '../../assets/svgs/DeleteBtn';
import { isOpenModifyRoomAtom } from '../../store/modalStore';

export const ModifyRoomModal = () => {
  const [, setIsOpenModifyRoom] = useAtom(isOpenModifyRoomAtom);
  const [, handleTitleChange] = useAtom(handleTitleChangeAtom);
  const [isOpenExit, onCloseExit] = useModal();

  return (
    <div className="relative f-col bg-white py-8 px-12 rounded-[20px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-[356px] h-[236px] mt-5 rounded-2xl bg-slate-400">
          <ImageUploadAndView />
        </div>
        <div className="f-col gap-5">
          <ModalInput
            title="방 제목"
            placeholderText="예시 : 분노의 질주 얘기하면서 같이 소주마셔요"
            inputType="text"
            autofocus
            handleInputChange={handleTitleChange}
          />
          <DropdownSelector />
          <CustomSelector />
          <OptionalFieldChange />
        </div>
      </div>
      <AddRoomButton closeModal={() => setIsOpenModifyRoom} />
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
