<script setup lang="ts">
import Divider from 'primevue/divider';
import ToggleSwitch from 'primevue/toggleswitch';
import SelectButton from 'primevue/selectbutton';
import { ref, watch } from 'vue';
import { useAppSettingsStore } from "@/AppSettings/appSettingsStore";
import { useVisualizationStore } from '@/Views/visualizationStore';

const appSettingsStore = useAppSettingsStore();

// Theme Change
const themeValue = ref(appSettingsStore.theme);
const themeOptions = ref(['System', 'Dark', 'Light']);
watch(themeValue, (newValue) => {
    appSettingsStore.theme = newValue;
});

// Timeline Settings Toggle
const timelineSettingsToggle = ref(appSettingsStore.timelineSettings);
watch(timelineSettingsToggle, (newValue) => {
    appSettingsStore.timelineSettings = newValue;
});

// View Settings Toggle
const viewSettingsToggle = ref(appSettingsStore.viewSettings);
watch(viewSettingsToggle, (newValue) => {
    appSettingsStore.viewSettings = newValue;
});

</script>

<template>
    <Divider />
    <div class="flex justify-between items-center mb-4 mt-8">
        <span class="text-surface-500 dark:text-surface-400">Theme</span>
        <SelectButton v-model="themeValue" :options="themeOptions" aria-labelledby="basic" :allowEmpty="false"/>
    </div>
    <div class="flex justify-between items-center mb-4">
        <span class="text-surface-500 dark:text-surface-400">Enable Timeline Settings</span>
        <ToggleSwitch v-model="timelineSettingsToggle" />
    </div>
    <div class="flex justify-between items-center mb-4">
        <span class="text-surface-500 dark:text-surface-400">Enable View Settings</span>
        <ToggleSwitch v-model="viewSettingsToggle" />
    </div>
</template>

<style scoped></style>