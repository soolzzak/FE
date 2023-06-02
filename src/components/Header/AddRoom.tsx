import { useAtom } from 'jotai';
import {
  handleCategoryChangeAtom,
  handleTitleChangeAtom,
} from '../../store/addRoomStore';
import { CustomSelector } from '../common/CustomSelector';
import { ModalInput } from '../common/ModalInput';
import { DeleteBtn } from '../../assets/svgs/DeleteBtn';
import { useModal } from '../../hooks/useModal';
import { OptionalFieldChange } from '../common/OptionalFieldChange';
import { ImageUploadAndView } from '../common/ImageUploadAndView';
import { CommonButton } from '../common/CommonButton';

export const AddRoom = ({ onClose }: { onClose: () => void }) => {
  const selections = ['누구나', '여자만', '남자만'];

  const [, handleTitleChange] = useAtom(handleTitleChangeAtom);
  const [, handleCategoryChange] = useAtom(handleCategoryChangeAtom);
  const [isOpenExit, onCloseExit, setIsOpenExit] = useModal();

  console.log('render');

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
          <ModalInput
            title="카테고리"
            inputType="text"
            placeholderText="카테고리를 설정해주세요"
            handleInputChange={handleCategoryChange}
          />
          <CustomSelector selections={selections} />
          <OptionalFieldChange />
        </div>
      </div>

      <CommonButton
        buttonText="혼술짝 방만들기"
        clickHandler={() => onClose()}
        dimensions="mt-7 w-2/3 h-14 self-center"
      />

      <div
        role="none"
        className="absolute right-3 top-3 hover:cursor-pointer"
        onClick={onClose}
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
            <div className="fixed">sss</div>
          </div>
        )}
      </div>
    </div>
  );
};
