import { atom } from "recoil";
import { resourcesData } from "../../hardcoded/resourcesData";

export const resourcesAtom = atom({
  key: "resourcesAtom",
  default: resourcesData,
});