import { atom } from 'jotai';

export const usernameAtom = atom('');
export const handleTokenChangeAtom = atom(null, (get, set, update: string) => {
  set(usernameAtom, () => update);
});
