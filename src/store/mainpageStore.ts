import { atom } from 'jotai';
import { MainpageRooms } from '../api/main';
import { DetailUserProfile } from '../api/mypage';

export type AuthToken = {
  sub: string;
  exp: number;
  auth: UserInfo;
};
export type UserInfo = {
  role: string;
  gender: string;
  id: number;
  email: string;
};

export type UserAlert = {
  username: string;
  roomId: number;
  uncheck: boolean;
  time: Date;
}

export type MessageAlert = {
  username: string;
  time: Date;
  uncheck: boolean;
}

export const usernameAtom = atom('');
export const handleTokenChangeAtom = atom(null, (get, set, update: string) => {
  set(usernameAtom, () => update);
});
export const tabAtom = atom('ALL');
export const handleTabChangeAtom = atom(null, (get, set, update: string) => {
  set(tabAtom, () => update);
});
export const displayedTabAtom = atom('전체');
export const handleDisplayedTabChangeAtom = atom(
  null,
  (get, set, update: string) => {
    set(displayedTabAtom, () => update);
  }
);
export const roomListAtom = atom([] as MainpageRooms[]);

export const handleRoomListChangeAtom = atom(
  null,
  (get, set, update: MainpageRooms[]) => {
    set(roomListAtom, () => update);
  }
);

export const userTokenAtom = atom({} as AuthToken | undefined);
export const handleUserTokenAtom = atom(
  null,
  (get, set, update: AuthToken | undefined) => {
    set(userTokenAtom, () => update);
  }
);
export const searchwordAtom = atom('');
export const handleSearchwordAtom = atom(null, (get, set, update: string) => {
  set(searchwordAtom, () => update);
});
export const searchwordTriggerAtom = atom(false);
export const handleSearchwordTriggerAtom = atom(
  null,
  (get, set, update: boolean) => {
    set(searchwordTriggerAtom, () => update);
  }
);

export const userNicknameAtom = atom('');

export const userAlertAtom = atom([] as UserAlert[]);
export const messageAlertAtom = atom([] as MessageAlert[]);