<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "~/components/Sidebar.vue";
import { useSettingsStore } from "~/store";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useLocale } from "vuetify";

const { current } = useLocale();
const { locale, t } = useI18n();
const { bIsSidebarOpened } = storeToRefs(useSettingsStore());

const toggleSidebarOpenState = () => {
  bIsSidebarOpened.value = !bIsSidebarOpened.value;
};

const toggleLanguage = () => {
  if(locale.value === 'ko') {
    locale.value = 'en';
    current.value = 'en';
  }
  else if(locale.value === 'en') {
    locale.value = 'ko';
    current.value = 'ko';
  }
};

onMounted(function () {
  const defaultLocale = navigator.language.split('-')[0];
});
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" density="compact" fixed>
      <v-app-bar-nav-icon @click="toggleSidebarOpenState()" />
      <v-toolbar-title class="bitmap-title">{{ t('bitmap') }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <Sidebar />
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<style scoped>
@import url(https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css);

body {
  font-family: Pretendard, 'Noto Sans KR', Roboto, sans-serif;
}
</style>