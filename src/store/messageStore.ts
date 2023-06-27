import { atom } from "jotai"

export const tabStateAtom = atom<string>('')
export const currentTabAtom = atom<string>('')
export const messageUserInfoAtom = atom<string | undefined>(undefined)