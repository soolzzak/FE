import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { messageAlertAtom, userAlertAtom, userNicknameAtom } from '../../store/mainpageStore';
import { Notifications } from '../../assets/svgs/Notifications';
import { NotificaionToggle } from './NotificaionToggle';

export const UserAlert = () => {
  const [userNickname] = useAtom(userNicknameAtom);
  const [, setUserAlert] = useAtom(userAlertAtom);
  const [, setMessageAlert] = useAtom(messageAlertAtom);

  let eventSource;
  useEffect(() => {
    if (userNickname) {
      eventSource = new EventSource(
        `https://api.honsoolzzak.com/api/events/${userNickname}`,
        {
          withCredentials: true,
        }
      );

      eventSource.addEventListener('roomCreated', (event) => {
        const response = JSON.parse(event.data);
        const timeStamp = new Date()
        setUserAlert((prevData) => [
          ...prevData,
          {
            username: response.message,
            roomId: response.roomId,
            uncheck: true,
            time: timeStamp,
          }
        ]
        )
      });

      eventSource.addEventListener('message', (event) => {
        const response = event.data;
        const timeStamp = new Date()
        setMessageAlert((prevData) => [
          ...prevData,
          {
            username: response,
            time: timeStamp,
            uncheck: true,
          }
        ]);
      });
    }
  }, [userNickname]);
  return (
    <NotificaionToggle />
  );
};
