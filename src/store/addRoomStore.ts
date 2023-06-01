import { atom } from 'jotai';

export const titleAtom = atom('');
export const handleTitleChangeAtom = atom(null, (get, set, update: string) => {
  set(titleAtom, () => update);
});

export const categoryAtom = atom<string>('');
export const handleCategoryChangeAtom = atom(
  null,
  (get, set, update: string) => {
    set(titleAtom, () => update);
  }
);
export const genderAtom = atom<string>('');
export const handleGenderChangeAtom = atom(null, (get, set, update: string) => {
  set(titleAtom, () => update);
});
export const publicOrPrivateAtom = atom<string>('');
export const handlPrivateSelectChangeAtom = atom(
  null,
  (get, set, update: string) => {
    set(titleAtom, () => update);
  }
);

export const roomPasswordAtom = atom<string>('');
export const handleRoomPasswprdChangeAtom = atom(
  null,
  (get, set, update: string) => {
    set(titleAtom, () => update);
  }
);
