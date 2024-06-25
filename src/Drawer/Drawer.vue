<script setup lang="ts">
import PageButtons from "./PageButtons/PageButtons.vue";
import { computed } from "vue";
import Sort from "../Drawer/ViewSettings/Sort.vue";
import Filter from "./ViewSettings/Tags/Filter.vue";
import NewEvent from "@/NewEvent/NewEvent.vue";
import Jump from "@/Jump/JumpButton.vue";
import { useVisualizationStore } from "@/Views/visualizationStore";
import VisualizationIndicator from "./VisualizationSwitcher/VisualizationIndicator.vue";
import { useMobileViewStore } from "@/Views/mobileViewStore";
import Settings from "@/AppSettings/Settings.vue";
import { useAppSettingsStore } from "@/AppSettings/appSettingsStore";

const visualizationStore = useVisualizationStore();
const mobileViewStore = useMobileViewStore();
const appSettingsStore = useAppSettingsStore();

const currentView = computed(() => visualizationStore.currentView);

const useTopBorder = computed(() => {
  const { uses } = currentView.value;
  return uses?.drawerDescription || uses?.sort || uses?.tags;
});
</script>

<template>
  <div class="drawerSettings">
    <Settings class="absolute bottom-0 bg-slate-200 dark:bg-slate-600 pointer-events-auto p-1.5 m-3 rounded" />

    <div class="flex-grow"></div>

    <div v-if="appSettingsStore.viewSettings" class="absolute flex bottom-0 right-0 bg-slate-200 dark:bg-slate-600 pointer-events-auto p-1 m-3 rounded">
      <NewEvent />
      <Sort v-if="currentView.uses?.sort" />
      <Jump v-if="currentView.uses?.jump" />
      <Filter v-if="currentView.uses?.tags" />
    </div>
  </div>
</template>

<style scoped>
.drawerSettings {
  line-height: 0px;
}
</style>

