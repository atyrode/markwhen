import { usePageStore } from "@/Markwhen/pageStore";
import { useMarkwhenStore } from "@/Markwhen/markwhenStore";
import type { MaybeRef } from "@vueuse/core";
import { ref, watchEffect, unref } from "vue";

export const useTagColor = (tag: MaybeRef<string>) => {
  const pageStore = usePageStore();
  const markwhenStore = useMarkwhenStore();

  const color = ref<string>();
  watchEffect(() => { 
    tag = unref(tag);
    color.value = pageStore.tags[unref(tag)];
  });
  //watchEffect(() => (color.value = pageStore.tags[unref(tag)]));

  return color;
};

//

// import { usePageStore } from "@/Markwhen/pageStore";
// import { useMarkwhenStore } from "@/Markwhen/markwhenStore";
// import type { MaybeRef } from "@vueuse/core";
// import { ref, watchEffect, unref } from "vue";

// export const useTagColor = (tag: MaybeRef<string>) => {
//   const pageStore = usePageStore();
//   const markwhenStore = useMarkwhenStore();

//   const color = ref<string>();

//   watchEffect(() => {
//     tag = unref(tag);
//     console.log("==========================")
//     console.log("tag");
//     console.log(tag);
//     console.log("pageStore.tags");
//     const new_tag = pageStore.tags;
//     console.log(new_tag);
//     console.log(pageStore.tags[unref(tag)]);
//     console.log("--------------------------")
//     const now = markwhenStore.tags;
//     console.log(now);
//     console.log(markwhenStore.timelines[markwhenStore.pageIndex]);
//     console.log("--------------------------")
//     console.log("pageStore.tags");
//     console.log(pageStore.tags);
//     console.log("markwhenStore.tags");
//     console.log(markwhenStore.tags);
//     console.log(unref(tag));
//     console.log(pageStore.tags[unref(tag)]);
    
//     (color.value = pageStore.tags[unref(tag)]);
//     console.log("color.value", color.value);
//   });
  

//   return color;
// };
