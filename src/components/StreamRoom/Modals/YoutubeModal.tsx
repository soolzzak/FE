import { Dispatch, SetStateAction } from 'react';
import { ModalInput } from '../../common/ModalInput';
import { CommonButton } from '../../common/CommonButton';

export const YoutubeModal = ({
  setVideoUrl,
  onYoutubeWatchalongClick,
}: {
  setVideoUrl: Dispatch<SetStateAction<string>>;
  onYoutubeWatchalongClick: () => void;
}) => (
  <div className="f-jic-col px-5 py-3 rounded-2xl bg-white">
    <ModalInput
      title="YouTube 링크 입력"
      inputType="text"
      placeholderText="유튜브 링크를 입력해주세요"
      handleInputChange={setVideoUrl}
    />
    <CommonButton
      enabled
      clickHandler={onYoutubeWatchalongClick}
      buttonText="PLAY"
      dimensions="mt-3"
    />
  </div>
);
