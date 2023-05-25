import { useState } from 'react';

export const ModalInput = ({ title }: { title: string }) => {
  const [modalInputValue, setModalInputValue] = useState('');
  return (
    <div>
      <p className="text-base font-bold text-[#454545]">{title}</p>
      <input
        type="text"
        value={modalInputValue}
        onChange={(e) => setModalInputValue(e.target.value)}
      />
    </div>
  );
};
