import { computed, ref, toRaw, watchEffect } from "vue";
import type { NodeArray, Node } from "@markwhen/parser/lib/Node";
import type { Timeline } from "@markwhen/parser/lib/Types";
import { useAppStore } from "@/App/appStore";
import { useMarkwhenStore } from "@/Markwhen/markwhenStore";
import { useTransformStore } from "@/Markwhen/transformStore";
import { useEditorOrchestratorStore } from "@/EditorOrchestrator/editorOrchestratorStore";
import { useEventDetailStore } from "@/EventDetail/eventDetailStore";
import { useAppSettingsStore } from "@/AppSettings/appSettingsStore";
import { useRoute } from "vue-router";

export type EventPath = number[];

export interface AppState {
  isDark?: boolean;
  hoveringPath?: EventPath;
  detailPath?: EventPath;
  pageIndex: number;
  colorMap: Record<string, Record<string, string>>;
}
export interface MarkwhenState {
  rawText?: string;
  parsed?: Timeline[];
  transformed?: Node<NodeArray>;
}

export interface State {
  app?: AppState;
  markwhen?: MarkwhenState;
}

export const equivalentPaths = (p1?: EventPath, p2?: EventPath): boolean => {
  if (!p1 || !p2) {
    return false;
  }
  return p1.join(",") === p2.join(",");
};

export const useStateSerializer = () => {
  const appSettingsStore = useAppSettingsStore();
  const markwhenStore = useMarkwhenStore();
  const transformStore = useTransformStore();
  const editorOrchestrator = useEditorOrchestratorStore();
  const eventDetailStore = useEventDetailStore();
  const route = useRoute()

  const colorMap = computed(() => { 
    return { "default": markwhenStore.timelines[markwhenStore.pageIndex].tags}
  });

  const state = computed<State>(() => ({
    app: {
      isDark: appSettingsStore.inferredDarkMode,
      hoveringPath: toRaw(editorOrchestrator.hoveringEventPaths) || undefined,
      detailPath: toRaw(eventDetailStore.detailEventPath),
      pageIndex: markwhenStore.pageIndex,
      path: route.path,
      colorMap: colorMap.value,
    },
    markwhen: {
      rawText: markwhenStore.rawTimelineString,
      parsed: markwhenStore.timelines,
      transformed: transformStore.transformedEvents,
    },
  }));

  return state;
};
