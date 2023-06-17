import { atom } from 'jotai';

import { Room } from '../api/streamRoom';

export const imageAtom = atom<File | null>(null);
export const handleImageChangeAtom = atom(null, (get, set, update: File) => {
  set(imageAtom, () => update);
});

export const titleAtom = atom('');
export const handleTitleChangeAtom = atom(null, (get, set, update: string) => {
  set(titleAtom, () => update);
});

export const categoryAtom = atom<string>('');
export const handleCategoryChangeAtom = atom(
  null,
  (get, set, update: string) => {
    set(categoryAtom, () => update);
  }
);

export const genderAtom = atom<string>('');
export const publicOrPrivateAtom = atom<boolean>(false);

export const roomPasswordAtom = atom<string | null>(null);
export const handleRoomPasswprdChangeAtom = atom(
  null,
  (get, set, update: string) => {
    set(roomPasswordAtom, () => update);
  }
);

export const streamRoomInfoAtom = atom<Room | null>(null);
