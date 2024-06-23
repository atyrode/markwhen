import { useEditorOrchestratorStore } from "@/EditorOrchestrator/editorOrchestratorStore";
import { watchEffect } from "vue";
import { useMarkwhenStore } from "../markwhenStore";

export const usePageEffects = () => {
  const editorOrchestrator = useEditorOrchestratorStore();
  const markwhenStore = useMarkwhenStore();

  editorOrchestrator.$onAction(({ name, store, args, after }) => {
    switch (name) {
      case "addPage":
        // it's either timelines.length or timelines.length + 1
        const newLength = markwhenStore.timelines.length;
        after(() => markwhenStore.setPageIndex(newLength));
        break;
      case "deletePage":
        const index = args[0];
        if (markwhenStore.timelines.length === 1) {
          break;
        }
        if (
          markwhenStore.pageIndex === index &&
          index === markwhenStore.timelines.length - 1
        ) {
          markwhenStore.setPageIndex(index - 1);
        } else if (index < markwhenStore.pageIndex) {
          markwhenStore.setPageIndex(index - 1);
        }
    }
  });

  watchEffect(() => {
    const numPages = markwhenStore.timelines.length;
    if (markwhenStore.pageIndex >= numPages) {
      markwhenStore.setPageIndex(markwhenStore.pageIndex - 1);
    }
  });
};
