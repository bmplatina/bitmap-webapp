import { defineStore } from 'pinia'
import { computed, ref } from "vue";

const useAuthStore = defineStore("auth", function() {
  // Properties
  const userName = ref<string>('');
  const userId = ref<number>(0);
  const bIsLoggedIn = ref<boolean>(false);

  // Getter
  const getUserName = computed(() => userName.value);
  const getUserId = computed(() => userId.value);
  const getIsLoggedIn = computed(() => bIsLoggedIn.value);

  // Setter
  function setUserName(newUserName: string) {
    userName.value = newUserName;
  }

  function setUserId(newUserId: number) {
    userId.value = newUserId;
  }

  function setIsLoggedIn(inLoggedInState: boolean) {
    bIsLoggedIn.value = inLoggedInState;
  }

  return {
    userName,
    userId,
    bIsLoggedIn,
    getUserName,
    getUserId,
    getIsLoggedIn,
    setUserName,
    setUserId,
    setIsLoggedIn,
  };
});

const useSettingsStore = defineStore("settings", function() {
  // Properties
  const lang = ref<string>('');
  const screenMode = ref<string>('');

  // Getter
  const getLanguage = computed(() => lang.value);
  const getScreenMode = computed(() => screenMode.value);

  // Setter
  function setLanguage(newLanguage: string) {
    lang.value = newLanguage;
  }

  function setScreenMode(newScreenMode: string) {
    screenMode.value = newScreenMode;
  }

  return {
    lang,
    screenMode,
    getLanguage,
    getScreenMode,
    setLanguage,
    setScreenMode,
  };
});

export { useAuthStore, useSettingsStore };