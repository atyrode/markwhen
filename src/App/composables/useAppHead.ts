import { computed } from "@vue/reactivity";
import { useHead } from "@vueuse/head";

export const useAppHead = () => {
  const title = computed(() => {
    return "Markwhen";
  });
  useHead({
    title,
    link: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
    meta: [
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no",
      },
    ],
  });
};
