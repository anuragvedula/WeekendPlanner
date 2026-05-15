import { selector } from "recoil";
import { resourcesAtom } from "../atoms/resourcesAtom";
import { categoryAtom } from "../atoms/categoryAtom";
import { budgetAtom } from "../atoms/budgetAtom";
import { activeStepAtom } from "../atoms/activeStepAtom";
import { selectedResourcesAtom } from "../atoms/selectedResourcesAtom";
import { haversineDistance } from "../../utils/haversine";

export const activeStepResourcesSelector = selector({
  key: "activeStepResourcesSelector",
  get: ({ get }) => {
    const resources = get(resourcesAtom);
    const categories = get(categoryAtom);
    const budget = get(budgetAtom);
    const activeStep = get(activeStepAtom);
    const selectedResources = get(selectedResourcesAtom);

    if (!categories.length || activeStep >= categories.length) return [];

    const currentCategory = categories[activeStep];
    let filtered = resources.filter(
      (r) => r.category === currentCategory && r.budget <= budget
    );

    // Fallback to all within-budget resources if no category match
    if (filtered.length === 0) {
      filtered = resources.filter((r) => r.budget <= budget);
    }

    // Sort by proximity to the previously selected resource
    if (activeStep > 0) {
      const prevCategory = categories[activeStep - 1];
      const prevSelected = selectedResources[prevCategory];
      if (prevSelected) {
        filtered = [...filtered].sort((a, b) => {
          const dA = haversineDistance(
            prevSelected.latitude,
            prevSelected.longitude,
            a.latitude,
            a.longitude
          );
          const dB = haversineDistance(
            prevSelected.latitude,
            prevSelected.longitude,
            b.latitude,
            b.longitude
          );
          return dA - dB;
        });
      }
    }

    return filtered;
  },
});
