import { atom } from 'jotai';

export const isOpenJoinRoomAtom = atom<boolean>(false);
export const isOpenWaitingAtom = atom<boolean>(false);
export const isOpenModifyRoomAtom = atom<boolean>(false);
export const isOpenReportAtom = atom<boolean>(false);
export const isOpenJoinHostAtom = atom<boolean>(false);
export const isOpenLeaveRoomAtom = atom<boolean>(false);