import { parse } from "@markwhen/parser";
import { Cache } from "@markwhen/parser/lib/Cache";
import { defineStore } from "pinia";
import { computed, reactive, ref, shallowReactive, type Ref } from "vue";
import type { Timeline } from "@markwhen/parser/lib/Types";
import { useParserWorker } from "./composables/useParserWorker";
import { exampleTimeline } from "@/exampleTimeline";
import { useAppSettingsStore } from "@/AppSettings/appSettingsStore";

export const recurrenceLimit = 100;

export const useMarkwhenStore = defineStore("markwhen", () => {
  const appSettingsStore = useAppSettingsStore();
  const cachedTimelineString = appSettingsStore.getSetting("timeline")
  console.log("cachedTimelineString", cachedTimelineString);
  const rawTimelineString = ref<string>(cachedTimelineString === undefined ? exampleTimeline : cachedTimelineString);

  if (cachedTimelineString === undefined) {
    appSettingsStore.changeSetting("timeline", exampleTimeline);
  }

  // const cache = reactive(new Cache());
  // const timelines = computed(
  //   () => parse(rawTimelineString.value, cache).timelines
  // );

  const useWorker = false;
  // console.log("using worker", useWorker);

  let timelines: Ref<Timeline[]>;
  const cache = shallowReactive(new Cache());
  if (useWorker) {
    timelines = useParserWorker(rawTimelineString).timelines;
    timelines.value = parse(rawTimelineString.value, cache).timelines;
  } else {
    timelines = computed(() => {
      // const start = performance.now();
      const r = parse(rawTimelineString.value, cache).timelines;
      // console.log("normal", performance.now() - start);
      return r;
    });
  }

  const setRawTimelineString = (s: string, range?: { from: number; to: number }) => {
    if (range) {
      const pre = rawTimelineString.value.substring(0, range.from);
      const post = rawTimelineString.value.substring(range.to);
      s = pre + s + post;
    }
    rawTimelineString.value = s;
    appSettingsStore.changeSetting("timeline", s);
  };

  // Attempt to remove pageSt0re dependency
  const pageIndex = ref<number>(0);
  const setPageIndex = (index: number) => {
    pageIndex.value = index;
  };
  const tags = computed(() => Object.keys(timelines.value[pageIndex.value].tags));
  const pageTimeline = computed(() => timelines.value[pageIndex.value]);
  ///

  return {
    // state
    rawTimelineString,
    cache,

    // getters
    timelines,
    pageTimeline,
    tags,
    pageIndex,

    // actions
    setRawTimelineString,
    setPageIndex,
  };
});
