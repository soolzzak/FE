import { atom } from 'jotai';

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
