import { atom } from 'jotai';

export const genderFilterAtom = atom('');
export const handleTokenChangeAtom = atom(null, (get, set, update: string) => {
  set(genderFilterAtom, () => update);
});
export const isEmptyFilterAtom = atom('ALL');
export const handleTabChangeAtom = atom(null, (get, set, update: string) => {
  set(isEmptyFilterAtom, () => update);
});
