import { useMarkwhenStore } from "@/Markwhen/markwhenStore";
import { computed } from "vue";

export const usePageAdjustedRanges = () => {
  const markwhenStore = useMarkwhenStore();

  const rangeOffset = computed(
    () => markwhenStore.pageTimeline.metadata.startStringIndex
  );
  const adjustedRanges = computed(() =>
    markwhenStore.pageTimeline.ranges.map(({ from, to, type, content }) => ({
      type,
      content,
      from: from - rangeOffset.value,
      to: to - rangeOffset.value,
    }))
  );

  return { rangeOffset, adjustedRanges };
};
