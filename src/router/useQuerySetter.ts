import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTransformStore } from "@/Markwhen/transformStore";
import { useVisualizationStore } from "@/Views/visualizationStore";
import { useMarkwhenStore } from "@/Markwhen/markwhenStore";

export const useQuerySetter = () => {
  const route = useRoute();
  const router = useRouter();
  const markwhenStore = useMarkwhenStore();
  const visualizationStore = useVisualizationStore();
  const transformStore = useTransformStore();

  const currentViewName = computed(() => {
    return visualizationStore.currentView.name;
  });

  const queryMap = computed(() => ({
    page: `${markwhenStore.pageIndex + 1}`,
    view: currentViewName.value,
    sort: transformStore.sort,
    filter: transformStore.filter.join(","),
  }));

  const computedQuery = computed(() =>
    new URLSearchParams(queryMap.value).toString()
  );

  const currentQueryMap = computed(() =>
    new URLSearchParams(route.query as Record<string, string>).toString()
  );

  let setterTimeout: any;
  watch([computedQuery, currentQueryMap], ([computedQ, receivedQ]) => {
    clearTimeout(setterTimeout as number);
    setterTimeout = setTimeout(() => {
      if (computedQ !== receivedQ) {
        router.replace(route.path + route.hash + "?" + computedQ);
      }
    }, 200);
  });
};
