import { ReactNode } from 'react';

type ChildenType = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal = ({ children, isOpen, onClose }: ChildenType) => {
  return (
    <>
      {isOpen && (
        <div className={`fixed inset-0 z-50 f-jic-col`}>
          <div
            className="fixed inset-0 bg-black opacity-75"
            onClick={() => onClose()}
          ></div>
          <div className="fixed">{children}</div>
        </div>
      )}
    </>
  );
};
