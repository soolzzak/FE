import { atom } from 'jotai';

export const genderFilterAtom = atom('ALL');
export const handleTokenChangeAtom = atom(null, (get, set, update: string) => {
  set(genderFilterAtom, () => update);
});
export const isEmptyFilterAtom = atom(false);
export const handleTabChangeAtom = atom(null, (get, set, update: boolean) => {
  set(isEmptyFilterAtom, () => update);
});
