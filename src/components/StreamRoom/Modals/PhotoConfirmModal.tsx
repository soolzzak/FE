import { Dispatch, SetStateAction } from 'react';
import { CommonButton } from '../../common/CommonButton';

export const PhotoConfirmModal = ({
  sendPhotoConfirmMessage,
  sendPhotoDenyMessage,
  setOpenConfirmModalIsOpen,
}: {
  sendPhotoConfirmMessage: () => void;
  sendPhotoDenyMessage: () => void;
  setOpenConfirmModalIsOpen: Dispatch<SetStateAction<boolean>>;
}) => (
  <div className="f-jic-col px-7 py-5 rounded-2xl bg-white">
    <span>사진찍기에 동의하시겠습니까?</span>
    <div className="flex gap-3">
      <CommonButton
        enabled
        clickHandler={() => {
          sendPhotoConfirmMessage();
          setOpenConfirmModalIsOpen(false);
        }}
        buttonText="동의하기"
        dimensions="mt-3"
      />
      <CommonButton
        enabled
        clickHandler={() => {
          sendPhotoDenyMessage();
          setOpenConfirmModalIsOpen(false);
        }}
        buttonText="동의하지 않기"
        dimensions="mt-3"
      />
    </div>
  </div>
);
