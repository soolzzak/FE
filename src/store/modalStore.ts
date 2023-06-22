import { atom } from 'jotai';

export type MessageInfo = {
    tab: string;
    username: string | undefined;
}

export const isOpenJoinRoomAtom = atom<boolean>(false);
export const isOpenWaitingAtom = atom<boolean>(false);
export const isOpenModifyRoomAtom = atom<boolean>(false);
export const isOpenReportAtom = atom<boolean>(false);
export const isOpenJoinHostAtom = atom<boolean>(false);
export const isOpenLeaveRoomAtom = atom<boolean>(false);
export const isOpenAuthModalAtom = atom<boolean>(false);
export const isOpenLoginModalAtom = atom<boolean>(false);
export const isOpenKickoutModalAtom = atom<boolean>(false);
export const isOpenYoutubeVideoModalAtom = atom<boolean>(false);
export const isOpenDeleteAccountAtom = atom<boolean>(false);

export const isOpenMessageModalAtom = atom<boolean>(false);
export const messageAtom = atom<MessageInfo>({tab: '받은쪽지함', username: undefined});
export const isOpenSearchUsernameModalAtom = atom<boolean>(false);

export const toastAtom = atom(false);
