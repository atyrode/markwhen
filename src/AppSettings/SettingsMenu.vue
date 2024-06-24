<script setup lang="ts">
import Divider from 'primevue/divider';
import ToggleSwitch from 'primevue/toggleswitch';
import SelectButton from 'primevue/selectbutton';
import { ref, watch } from 'vue';
import { useAppSettingsStore } from "@/AppSettings/appSettingsStore";
import { useVisualizationStore } from '@/Views/visualizationStore';

const appSettingsStore = useAppSettingsStore();
const visualizationStore = useVisualizationStore();

// Theme Change
const themeValue = ref(appSettingsStore.theme);
const themeOptions = ref(['System', 'Dark', 'Light']);
watch(themeValue, (newValue) => {
    appSettingsStore.theme = newValue;
});

// Sidebar Toggle
const sidebarToggle = ref(appSettingsStore.sidebarVisible);
console.log("sidebarToggle initial value: ", sidebarToggle.value);
watch(sidebarToggle, (newValue) => {
    console.log("sidebarToggle current value: ", newValue);
    appSettingsStore.sidebarVisible = newValue;
});

// View menu Toggle
const viewMenuToggle = ref(visualizationStore.showingWelcomeViewPicker);
watch(viewMenuToggle, (newValue) => {
    visualizationStore.showingWelcomeViewPicker = newValue;
});
</script>

<template>
    <Divider />
    <div class="flex justify-between items-center mb-4">
        <span class="text-surface-500 dark:text-surface-400">Theme</span>
        <SelectButton v-model="themeValue" :options="themeOptions" aria-labelledby="basic" :allowEmpty="false"/>
    </div>
    <div class="flex justify-between items-center mb-4">
        <span class="text-surface-500 dark:text-surface-400">Show Sidebar</span>
        <ToggleSwitch v-model="sidebarToggle" />
    </div>
    <div class="flex justify-between items-center mb-4">
        <span class="text-surface-500 dark:text-surface-400">Enable view menu</span>
        <ToggleSwitch v-model="viewMenuToggle" />
    </div>
</template>

<style scoped></style>