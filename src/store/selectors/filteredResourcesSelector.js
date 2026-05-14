import { selector } from "recoil";
import { resourcesAtom } from "../atoms/resourcesAtom";
import { categoryAtom } from "../atoms/categoryAtom";
import { budgetAtom } from "../atoms/budgetAtom";

export const filteredResourcesSelector = selector({
  key: "filteredResourcesSelector",

  get: ({ get }) => {
    const resources = get(resourcesAtom);
    const categories = get(categoryAtom);
    const budget = get(budgetAtom);

    return resources.filter((resource) => {
      const categoryMatch =
        categories.length === 0 ||
        categories.includes(resource.category);

      const budgetMatch = resource.budget <= budget;

      return categoryMatch && budgetMatch;
    });
  },
});