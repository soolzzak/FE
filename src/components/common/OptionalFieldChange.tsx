import { useAtom } from 'jotai';
import {
  handleRoomPasswprdChangeAtom,
  publicOrPrivateAtom,
} from '../../store/addRoomStore';
import { ModalInput } from './ModalInput';
import { TwoOptionsSelector } from './TwoOptionsSelector';

export const OptionalFieldChange = ({
  isPrivate,
  roomPassword,
}: {
  isPrivate?: boolean;
  roomPassword?: string;
}) => {
  const [, setPassword] = useAtom(handleRoomPasswprdChangeAtom);
  const [selectedOption] = useAtom(publicOrPrivateAtom);
  const selections = [false, true];

  // let leftRightSelect: boolean[] = selections;

  // if (isPrivate === true) {
  //   setSelectedOption(selections[1]);
  // } else if (isPrivate === false) {
  //   setSelectedOption(selections[0]);
  // }

  // console.log('비밀인지', isPrivate);

  return (
    <div className="f-ic ">
      <TwoOptionsSelector
        title="방 공개설정"
        leftRightSelect={selections}
        isPrivate={isPrivate}
        roomPassword={roomPassword}
      />
      {selectedOption === selections[1] ? (
        <ModalInput
          inputType="password"
          title="방 비밀번호"
          // placeholderText="비밀번호를 입력해주세요"
          placeholderText={roomPassword ?? '비밀번호를 입력해주세요'}
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
