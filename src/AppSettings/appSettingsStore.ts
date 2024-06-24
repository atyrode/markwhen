import { useVisualizationStore } from "@/Views/visualizationStore";
import { useMediaQuery } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref, watchEffect, watch } from "vue";

export const themeOptions = ["System", "Light", "Dark"] as const;

// Utility function to get settings from localStorage
const getSettingsFromLocalStorage = () => {
  const savedSettings = localStorage.getItem("settings");
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  return {};
};

// Utility function to save settings to localStorage
const saveSettingsToLocalStorage = (settings: Record<string, any>) => {
  localStorage.setItem("settings", JSON.stringify(settings));
};

// Centralized function to get a specific setting
const getSetting = (key: string, defaultValue: any) => {
  const settings = getSettingsFromLocalStorage();
  return settings[key] !== undefined ? settings[key] : defaultValue;
};

// Centralized function to set a specific setting
const setSetting = (key: string, value: any) => {
  const settings = getSettingsFromLocalStorage();
  settings[key] = value;
  saveSettingsToLocalStorage(settings);
};

export const useAppSettingsStore = defineStore("appSettings", () => {
  console.log('appSettingsStore.ts: useAppSettingsStore()');

  const theme = ref<typeof themeOptions[number]>(
    getSetting("theme", "System")
  );

  const mediaQueryDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const toggleDarkMode = () => {
    switch (theme.value) {
      case "System":
        theme.value = "Dark";
        break;
      case "Dark":
        theme.value = "Light";
        break;
      case "Light":
        theme.value = "System";
        break;
    }
    setSetting("theme", theme.value);
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

  watch(theme, (newValue) => {
    setSetting("theme", newValue);
  });

  // Expose the get and set functions for individual settings
  const getSettingValue = (key: string, defaultValue: any) => {
    return getSetting(key, defaultValue);
  };

  const setSettingValue = (key: string, value: any) => {
    setSetting(key, value);
  };

  return {
    theme,
    inferredDarkMode,
    toggleDarkMode,
    getSettingValue, // Expose function to get individual setting
    setSettingValue, // Expose function to set individual setting
  };
});