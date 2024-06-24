import { useVisualizationStore } from "@/Views/visualizationStore";
import { useSidebarStore } from "@/Sidebar/sidebarStore";

import { useMediaQuery } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref, watchEffect, watch } from "vue";

export const themeOptions = ["System", "Light", "Dark"] as const;

const getSettings = () => {
  const savedSettings = localStorage.getItem("settings");
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
};

export const useAppSettingsStore = defineStore("appSettings", () => {

  console.log('appSettingsStore.ts: useAppSettingsStore()');
  const sidebarStore = useSidebarStore();

  const theme = ref<typeof themeOptions[number]>("System");
  const sidebarVisible = ref<boolean>(false); // Add sidebar visibility state
  
  const savedSettings = getSettings();
  if (savedSettings) {
    if (savedSettings.theme && themeOptions.includes(savedSettings.theme)) {
      console.log('setting theme to ', savedSettings.theme);
      theme.value = savedSettings.theme;
    }
    if (typeof savedSettings.sidebarVisible === 'boolean') {
      sidebarVisible.value = savedSettings.sidebarVisible;
    }
  }
  
  const mediaQueryDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const toggleDarkMode = () => {
    if (theme.value === "System") {
      theme.value = "Dark";
    } else if (theme.value === "Dark") {
      theme.value = "Light";
    } else {
      theme.value = "System";
    }
  };

  const inferredDarkMode = computed(() => {
    if (theme.value !== "System") {
      return theme.value === "Dark";
    }
    if (typeof window === "undefined" || !window) {
      return false;
    }
    return mediaQueryDarkMode.value;
  });

  watch(sidebarVisible, (newValue) => {
      console.log('switching sidebar visibility from ', sidebarStore.visible, ' to ', newValue);
      sidebarStore.visible = newValue;
  });

  watchEffect(() => {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        theme: theme.value,
        sidebarVisible: sidebarVisible.value, // Save sidebar visibility state
      })
    );
  });

  return {
    theme,
    inferredDarkMode,
    savedSettings,
    toggleDarkMode,
    sidebarVisible, // Return sidebar visibility state
  };
});