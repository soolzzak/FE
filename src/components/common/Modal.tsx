import { ReactNode } from 'react';

type ChildenType = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  bgClassChange?: string;
};

export const Modal = ({ children, isOpen, onClose, bgClassChange}: ChildenType) => (
  <div>
    {isOpen && (
      <div className="fixed inset-0 z-50 f-jic-col">
        <div
          role="none"
          className={`fixed inset-0 ${bgClassChange || 'bg-black opacity-75'} `}
          onClick={() => onClose()}
        />
        <div className="fixed">{children}</div>
      </div>
    )}
  </div>
);
