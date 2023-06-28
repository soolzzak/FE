import { atom } from 'jotai';

export const micOnAtom = atom<boolean>(true);
// export const micOnChangeAtom = atom(null, (get, set, micOnAtomValue) => {
//     set(micOnAtom, prev => !prev)
// })
export const monitorOnAtom = atom<boolean>(true);
// export const monitorOnChangeAtom = atom(null, (get, set, monitorOnAtomValue) => {
//     set(monitorOnAtom, prev => !prev)
// })
export const screenShareOnAtom = atom<boolean>(true);
// export const screenShareOnChangeAtom = atom(null, (get, set, screenShareOnAtomValue) => {
//     set(monitorOnAtom, prev => !prev)
// })

export const hostIdAtom = atom<number | null>(null);
