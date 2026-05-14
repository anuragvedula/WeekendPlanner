import { atom } from "recoil";

export const peopleAtom = atom({
  key: "peopleAtom",
  default: {
    type: "Solo",
    count: 1,
  },
});