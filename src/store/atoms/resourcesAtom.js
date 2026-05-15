import { selector } from "recoil";
import { cityAtom } from "./cityAtom";
import { hydData } from "../../hardcoded/hydData";
import { blrData } from "../../hardcoded/blrData";

export const resourcesAtom = selector({
  key: "resourcesAtom",
  get: ({ get }) => {
    const city = get(cityAtom);
    if (city === "Bangalore") return blrData;
    if (city === "Hyderabad") return hydData;
    return [];
  },
});
