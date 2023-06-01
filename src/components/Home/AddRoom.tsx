import { useState } from 'react';
import { useCustomSelector } from '../../hooks/useCustomSelector';
import { CustomSelector } from '../common/CustomSelector';
import { ModalInput } from '../common/ModalInput';
import { TwoOptionsSelector } from '../common/TwoOptionsSelector';
import { DeleteBtn } from '../../assets/svgs/DeleteBtn';
import { useModal } from '../../hooks/useModal';

export const AddRoom = ({ onClose }: { onClose: () => void }) => {
  const selections = ['누구나', '여자만', '남자만'];
  const [selectedOption, handleOptionClick] = useCustomSelector<string>(
    selections[0]
  );

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

  // const myVideoRef = useRef<HTMLVideoElement>(null);

  // let mediaStream: MediaStream | null = null;
  // const getMediaStream = async () => {
  //   try {
  //     mediaStream = await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true,
  //     });

  //     if (myVideoRef.current) {
  //       myVideoRef.current.srcObject = mediaStream;
  //     }
  //   } catch (error) {
  //     console.log('Error accessing media devices:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (isOpen) {
  //     getMediaStream();
  //   }

  //   return () => {
  //     if (mediaStream) {
  //       mediaStream.getTracks().forEach((track) => track.stop());
  //     }
  //   };
  // }, [isOpen]);

  const [isOpenExit, onCloseExit, setIsOpenExit] = useModal();

  return (
    <div className="relative f-col bg-white py-8 px-12 rounded-[20px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-[356px] h-[236px] mt-5 rounded-2xl bg-slate-400">
          {/* {isOpen && (
            <video
              className="rounded-2xl w-[356px] h-[236px] object-cover"
              ref={myVideoRef}
              autoPlay
              muted
            />
          )} */}
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
          />
          <ModalInput
            title="카테고리"
            inputType="text"
            placeholderText="카테고리를 설정해주세요"
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
      <div
        role="none"
        className="absolute -right-3 -top-3 hover:cursor-pointer"
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
