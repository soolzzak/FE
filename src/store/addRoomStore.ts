import { atom } from 'jotai';

export const titleAtom = atom<string>('');
console.log(titleAtom);
export const categoryAtom = atom<string>('');
export const genderAtom = atom<string>('');
export const publicOrPrivateAtom = atom<string>('');
export const roomPasswordAtom = atom<string>('');
