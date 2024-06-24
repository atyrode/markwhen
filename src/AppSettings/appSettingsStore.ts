import { useVisualizationStore } from "@/Views/visualizationStore";
import { useMediaQuery } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref, watchEffect, watch } from "vue";

export const themeOptions = ["System", "Light", "Dark"] as const;
export const timelineSettingsToggle = [true, false] as const;
export const viewSettingsToggle = [true, false] as const;

export const useAppSettingsStore = defineStore("appSettings", () => {

  const getSettingsFromLocalStorage = () => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {};
  };

  const saveSettingsToLocalStorage = (settings: Record<string, any>) => {
    localStorage.setItem("settings", JSON.stringify(settings));
  };

  const initializeSettings = (settingKey: string, defaultValue: any) => {
    const settings = getSettingsFromLocalStorage();
    return settings[settingKey] !== undefined ? settings[settingKey] : defaultValue;
  };

  const changeSetting = (key: string, value: any) => {
    const settings = getSettingsFromLocalStorage();
    settings[key] = value;
    saveSettingsToLocalStorage(settings);

    if (key === "theme") {
      theme.value = value;
    } else if (key === "sidebarVisible") {
      timelineSettings.value = value;
    }
  };

  const theme = ref<typeof themeOptions[number]>(
    initializeSettings("theme", "System")
  );

  const mediaQueryDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const inferredDarkMode = computed(() => {
    if (theme.value !== "System") {
      return theme.value === "Dark";
    }
    if (typeof window === "undefined" || !window) {
      return false;
    }
    return mediaQueryDarkMode.value;
  });

  const timelineSettings = ref<typeof timelineSettingsToggle[number]>(
    initializeSettings("timelineSettings", false)
  );

  const viewSettings = ref<typeof viewSettingsToggle[number]>(
    initializeSettings("viewSettings", false)
  );

  watch(theme,
    () => {
      changeSetting("theme", theme.value);
      console.log("Theme changed to " + theme.value);
  });

  watch(timelineSettings,
    () => {
      changeSetting("timelineSettings", timelineSettings.value);
      console.log("Sidebar visibility changed to " + timelineSettings.value);
  });

  watch(viewSettings,
    () => {
      changeSetting("viewSettings", viewSettings.value);
      console.log("View settings visibility changed to " + viewSettings.value);
  });

  return {
    // settings
    theme,
    timelineSettings,
    viewSettings,
    inferredDarkMode,
    changeSetting
  };
});