import { useAtom } from 'jotai';
import { DeleteBtn } from '../../assets/svgs/DeleteBtn';
import { handleTitleChangeAtom } from '../../store/addRoomStore';
import { CustomSelector } from '../common/CustomSelector';
import { DropdownSelector } from '../common/DropdownSelector';
import { ImageUploadAndView } from '../common/ImageUploadAndView';
import { ModalInput } from '../common/ModalInput';
import { OptionalFieldChange } from '../common/OptionalFieldChange';
import { AddRoomButton } from './AddRoomButton';

export const AddRoom = ({ onClose }: { onClose: () => void }) => {
  const [, handleTitleChange] = useAtom(handleTitleChangeAtom);
  const handleClose = () => {
    handleTitleChange('');
    onClose();
  };
  return (
    <div className="relative f-col bg-white px-12 rounded-[20px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-7">
        <div className="w-[356px] h-[300px] rounded-2xl bg-slate-400">
          <ImageUploadAndView />
        </div>
        <div className="f-col gap-3">
          <ModalInput
            inputValue
            constraint={25}
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
      <AddRoomButton closeModal={handleClose} />
      <div
        role="none"
        className="absolute right-3 top-3 hover:cursor-pointer"
        onClick={handleClose}
      >
        <DeleteBtn />
      </div>
    </div>
  );
};
