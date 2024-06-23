import { useMarkwhenStore } from "@/Markwhen/markwhenStore";
import type { MaybeRef } from "@vueuse/core";
import { ref, watchEffect, unref } from "vue";

export const useTagColor = (tag: MaybeRef<string>) => {
  const markwhenStore = useMarkwhenStore();
  
  const color = ref<string>();
  
  watchEffect(() => {
    color.value = markwhenStore.timelines[markwhenStore.pageIndex].tags[unref(tag)]
  });
  return color;
};