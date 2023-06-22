import { Dispatch, SetStateAction } from 'react';
import { CommonButton } from '../../common/CommonButton';

export const PhotoConfirmModal = ({
  sendPhotoConfirmMessage,
  setOpenConfirmModalIsOpen,
}: {
  sendPhotoConfirmMessage: () => void;
  setOpenConfirmModalIsOpen: Dispatch<SetStateAction<boolean>>;
}) => (
  <div className="f-jic-col px-5 py-3 rounded-2xl bg-white">
    <span>사진찍기에 동의하시겠습니까?</span>
    <CommonButton
      enabled
      clickHandler={() => {
        sendPhotoConfirmMessage();
        setOpenConfirmModalIsOpen(false);
      }}
      buttonText="동의하기"
      dimensions="mt-3"
    />
  </div>
);
