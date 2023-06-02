import { atom } from 'jotai';

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
export const publicOrPrivateAtom = atom<string>('');

export const roomPasswordAtom = atom<string>('');
export const handleRoomPasswprdChangeAtom = atom(
  null,
  (get, set, update: string) => {
    set(roomPasswordAtom, () => update);
  }
);
