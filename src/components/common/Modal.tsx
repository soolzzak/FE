import { ReactNode } from 'react';

type ChildenType = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  hasOverlay?: boolean;
};

export const Modal = ({
  children,
  isOpen,
  onClose,
  hasOverlay,
}: ChildenType) => (
  <div>
    {isOpen && (
      <div className="fixed inset-0 z-50 f-jic-col">
        <div
          role="none"
          className={`fixed inset-0 ${
            hasOverlay ? 'bg-black opacity-75' : ''
          } `}
          onClick={() => onClose()}
        />
        <div className="fixed">{children}</div>
      </div>
    )}
  </div>
);
