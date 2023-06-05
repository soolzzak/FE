import { atom, useAtom } from 'jotai';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Notifications } from '../../assets/svgs/Notifications';
import { useModal } from '../../hooks/useModal';
import { CommonButton } from '../common/CommonButton';
import { Modal } from '../common/Modal';
import { LoginModal } from '../login/LoginModal';
import { AddRoom } from './AddRoom';

const username = Cookies.get('accessKey');
export const usernameAtom = atom(username);

interface AuthToken {
  sub: string;
}

export const HeaderRightSection = () => {
  const [isOpenAuth, onCloseAuth, setIsOpenAuth] = useModal();
  const [isOpenRoomCreate, onCloseRoomCreate, setIsOpenRoomCreate] = useModal();
  const [user] = useAtom(usernameAtom);

  const [userInfo, setUserInfo] = useState<AuthToken>();

  useEffect(() => {
    if (user) {
      setUserInfo(jwtDecode(user));
    }
  }, [user]);

  console.log(userInfo);
  return (
    <section className="f-ic justify-end mr-4 min-w-[469px]">
      <Modal isOpen={isOpenAuth} hasOverlay onClose={onCloseAuth}>
        <LoginModal onClose={onCloseAuth}/>
      </Modal>
      <Modal isOpen={isOpenRoomCreate} onClose={onCloseRoomCreate} hasOverlay>
        <AddRoom onClose={onCloseRoomCreate} />
      </Modal>
      {userInfo ? (
        <>
          <CommonButton
            buttonText="혼술짝 방만들기"
            clickHandler={() => setIsOpenRoomCreate(true)}
            dimensions="mr-7"
          />
          <Notifications />

          <div className="px-7 text-lg font-semibold">{userInfo.sub}</div>
          <div className="w-12 h-12 rounded-full bg-primary-200 mr-3" />
        </>
      ) : (
        <CommonButton
          buttonText="로그인"
          clickHandler={() => setIsOpenAuth(true)}
          dimensions="mr-7"
        />
      )}
    </section>
  );
};
