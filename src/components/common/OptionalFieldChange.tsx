import { useAtom } from 'jotai';
import {
  handleRoomPasswprdChangeAtom,
  publicOrPrivateAtom,
} from '../../store/addRoomStore';
import { ModalInput } from './ModalInput';
import { TwoOptionsSelector } from './TwoOptionsSelector';

export const OptionalFieldChange = () => {
  const [, setPassword] = useAtom(handleRoomPasswprdChangeAtom);
  const [selectedOption] = useAtom(publicOrPrivateAtom);

  const selections = [false, true];
  return (
    <div className="f-ic ">
      <TwoOptionsSelector title="방 공개설정" leftRightSelect={selections} />
      {selectedOption === selections[1] ? (
        <ModalInput
          inputType="password"
          title="방 비밀번호"
          placeholderText="비밀번호를 입력해주세요"
          handleInputChange={setPassword}
        />
      ) : (
        <ModalInput
          inputType="password"
          title="방 비밀번호"
          disabled
          placeholderText="비밀번호를 입력해주세요"
          handleInputChange={setPassword}
        />
      )}
    </div>
  );
};
