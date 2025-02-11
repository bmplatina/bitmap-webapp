<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();
const route = useRoute();
</script>

<template>
  <Head>
    <Title>{{ t('bitmap') }}</Title>
    <Meta name="description" :content="t('bitmap')" />
  </Head>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
  </div>
</template>
