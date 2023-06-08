import { DeleteBtn } from '../../assets/svgs/DeleteBtn';

export const CancelButton = ({ onClose }: { onClose?: () => void }) => (
  <div
    role="none"
    className="absolute right-3 top-3 hover:cursor-pointer"
    onClick={onClose}
  >
    <DeleteBtn />
  </div>
);
