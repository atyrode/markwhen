import type {
  EventPath,
} from "@/Views/ViewOrchestrator/useStateSerializer";
import type { SomeNode } from "@markwhen/parser/lib/Node";
import { get } from "@markwhen/parser/lib/Noder";
import type { MaybeRef } from "@vueuse/core";
import { computed, ref, unref, watchEffect } from "vue";
import { useTransformStore } from "@/Markwhen/transformStore";
import { useMarkwhenStore } from "@/Markwhen/markwhenStore";

export type EventFinder = (
  eventPath?: EventPath | null
) => SomeNode | undefined;

export const useEventFinder = (
  path?: MaybeRef<EventPath | undefined>
) => {
  const transformStore = useTransformStore();
  const markwhenStore = useMarkwhenStore();
  const transformedEvents = computed(() => transformStore.transformedEvents);

  const isEventPath = (e: EventPath): e is EventPath => {
    return (e as EventPath) && Array.isArray((e as EventPath));
  };

  const event = ref<SomeNode>();

  watchEffect(() => {
    if (!path) {
      event.value = undefined;
      return;
    }
    const eventPath = unref(path);
    if (!eventPath) {
      event.value = undefined;
      return;
    }
    if (isEventPath(eventPath)) {
      let node: SomeNode | undefined;
      node = markwhenStore.pageTimeline.events;
      event.value = node ? get(node, eventPath) : undefined;
      return;
    } else {
      let root: SomeNode | undefined;
      root = markwhenStore.pageTimeline.events;
      if (root) {
        event.value = get(root, eventPath);
        return;
      }
    }
    event.value = undefined;
  });

  return event;
};
