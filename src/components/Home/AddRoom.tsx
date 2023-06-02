import { useAtom } from 'jotai';
import { useState } from 'react';
import { useCustomSelector } from '../../hooks/useCustomSelector';
import {
  handlPrivateSelectChangeAtom,
  handleCategoryChangeAtom,
  handleGenderChangeAtom,
  handleRoomPasswprdChangeAtom,
  handleTitleChangeAtom,
} from '../../store/addRoomStore';
import { CustomSelector } from '../common/CustomSelector';
import { ModalInput } from '../common/ModalInput';
import { TwoOptionsSelector } from '../common/TwoOptionsSelector';
import { DeleteBtn } from '../../assets/svgs/DeleteBtn';
import { useModal } from '../../hooks/useModal';
import { CancelButton } from '../common/CancelButton';

export const AddRoom = ({ onClose }: { onClose: () => void }) => {
  const selections = ['누구나', '여자만', '남자만'];
  const [selectedOption, handleOptionClick] = useCustomSelector<string>(
    selections[0]
  );
  const [, handleTitleChange] = useAtom(handleTitleChangeAtom);
  const [, handleCategoryChange] = useAtom(handleCategoryChangeAtom);
  const [, handleGenderChange] = useAtom(handleGenderChangeAtom);
  const [, handlePrivateorPublic] = useAtom(handlPrivateSelectChangeAtom); //
  const [, handleRoomPasswordChange] = useAtom(handleRoomPasswprdChangeAtom);

  const [, setImage] = useState<File | undefined>();
  const [view, setView] = useState<string | undefined>();

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    const fileType = file?.type.split('/')[0];

    // ----------- Image validation -------------
    if (!file) return;
    if (fileType !== 'image') {
      alert('The selected file is not an image.');
      return;
    }
    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size is too large. Please select a file under 3 MB.');
      return;
    }
    // ---------------------------------------
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setView(reader.result as string);
    };
  };

  console.log('render');

  const [isOpenExit, onCloseExit, setIsOpenExit] = useModal();

  return (
    <div className="relative f-col bg-white py-8 px-12 rounded-[20px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-[356px] h-[236px] mt-5 rounded-2xl bg-slate-400">
          <label
            htmlFor="imageInput"
            className="cursor-pointer f-jic rounded-lg object-cover shadow w-full h-full bg-slate-400 hoverAnim"
            title="Upload Image"
          >
            {view ? '' : '이미지 업로드'}
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {view ? (
              <img
                className="rounded-lg object-cover shadow w-full h-full "
                src={view}
                alt=""
              />
            ) : (
              ''
            )}
          </label>
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
          <CustomSelector
            selections={selections}
            selectedOption={selectedOption}
            handleOptionClick={handleOptionClick}
          />
          <div className="f-ic ">
            <TwoOptionsSelector
              title="방 공개설정"
              leftText="공개"
              rightText="비공개"
            />
            <ModalInput
              inputType="password"
              title="방 비밀번호"
              disabled
              placeholderText="비밀번호를 입력해주세요"
              handleInputChange={handleTitleChange}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="rounded-[18px] h-16 mt-12 bg-[#9A9A9A] text-white text-[20px] font-bold"
        onClick={() => onClose()}
      >
        혼술짝 방만들기
      </button>
      <CancelButton onClose={onClose} />

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
