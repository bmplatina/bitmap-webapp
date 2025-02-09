<script setup lang="ts">
// Libraries
import { ref } from 'vue'
import type { Game } from "~/interfaces/Games";
import { useI18n } from 'vue-i18n';
import { useDayjs } from "#dayjs";
import { useDisplay } from "vuetify";
import { MdPreview } from "md-editor-v3";

// 반응형 상태 가져오기
const { mobile } = useDisplay();

const dayjs = useDayjs();
const { locale, t } = useI18n();

const props = defineProps<{
  gameObject: Game,
}>();

/*
 * Released Ago
 */
function releasedAgo(): number {
  const today = dayjs();
  const releasedDateFormat = dayjs(props.gameObject.gameReleasedDate);
  return today.diff(releasedDateFormat, "years");
}

function formatDate(value: string, locale: string) {
  return locale === 'ko'
      ? dayjs(value).format('YYYY/MM/DD')
      : dayjs(value).format('MM/DD/YYYY');
}

/*
 * Modal state
 */
let bIsDetailModalOpened = ref(false);

/**
 * Insert or Update InstallState: GameInstallInfo to NeDB
 */
</script>

<template>
  <!-- Button -->
  <v-card max-width="400">
    <v-img
        :src="gameObject.gameImageURL"
        lazy-src="/images/unknownImage.png"
        :alt="gameObject.gameTitle"
        cover
        @click="bIsDetailModalOpened = true"
    ></v-img>
    <v-card-text>
      <div style="text-align: left;">
        <h2 class="title primary--text mb-2" @click="bIsDetailModalOpened = true">{{ gameObject.gameTitle }}</h2>
        <div class="d-flex align-center mb-2">
          <v-img
              src="/images/platformWindows11.png"
              v-if="props.gameObject.gamePlatformWindows == 1"
              :max-width="20"
              :max-height="20"
              style="margin-right: 8px"
          ></v-img>
          <v-img
              src="/images/platformMac.png"
              v-if="props.gameObject.gamePlatformMac == 1"
              :max-width="20"
              :max-height="20"
              style="margin-right: 8px"
          ></v-img>
        </div>
        <p class="mb-0">{{ `${t('dev')}: ${gameObject.gameDeveloper}` }}</p>
        <p class="mb-0">{{ `${t('genre')}: ${gameObject.gameGenre}` }}</p>
        <p class="mb-0">{{ `${t('released-date')}: ${formatDate(gameObject.gameReleasedDate, locale)}` }}</p>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn variant="plain" @click="bIsDetailModalOpened = true">{{ t('details') }}</v-btn>
    </v-card-actions>
  </v-card>

  <!-- Detail View -->
  <v-dialog v-model="bIsDetailModalOpened" width="90%" height="80%">
    <v-card style="height: 100%;">
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ t('bitmap-store') }}: {{ gameObject.gameTitle }}
      </v-card-title>
      <v-divider />

      <v-row
          style="height: 80%;"
          class="d-flex"
          :class="mobile ? 'flex-column' : 'flex-row'"
      >
        <!-- 게임 이미지 및 정보 -->
        <v-col
            v-if="!mobile"
            :cols="mobile ? 0 : 3"
            class="d-flex flex-column align-items-center"
        >
          <div>
            <v-img
                class="rounded-xl mx-auto"
                :src="gameObject.gameImageURL"
                lazy-src="/images/unknownImage.png"
                :alt="gameObject.gameTitle"
                :max-width="240"
                style="margin-top: calc(4% + 16px);"
            ></v-img>
            <div class="d-flex justify-center align-center mt-5 w-100">
              <h2 class="text-h5 mr-2">{{ gameObject.gameTitle }}</h2>
              <p v-if="gameObject.isEarlyAccess" class="mb-0">
                {{ t("early-access") }}
              </p>
            </div>
          </div>
        </v-col>

        <!-- 구분선 (모바일에서는 제거) -->
        <v-divider
            v-if="!mobile"
            vertical
            style="margin-top: 12px; margin-bottom: 12px"
        ></v-divider>

        <!-- 게임 상세 정보 -->
        <v-col
            :cols="mobile ? 12 : 9"
            class="align-center"
            style="display: flex; flex-direction: column; height: 100%;"
        >
          <div
              style="flex: 1; overflow-y: auto; margin-top: 4%; margin-bottom: 1%; margin-left: 4%; margin-right: 4%;"
          >
            <v-card
                class="mt-4 pa-3 rounded-xl"
                :title="t('preview')"
                variant="tonal"
                style="white-space: pre-line;"
            >
              <iframe
                  :src="`https://youtube.com/embed/${props.gameObject.gameVideoURL}`"
                  class="mx-auto"
                  frameborder="0"
                  allowfullscreen
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                  style="width: 100%; max-width: 512px; height: 288px; margin-top: 4%;"
                  referrerpolicy="no-referrer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </v-card>

            <v-card
                class="mt-4 pa-3 rounded-xl"
                :title="locale === 'ko' ? `${gameObject.gameTitle + t('information-of')}` : `${t('information-of') + gameObject.gameTitle}`"
                variant="tonal"
                style="white-space: pre-line;"
            >
              <v-card-text>
                <p>{{ t('released-date') }}: {{ formatDate(gameObject.gameReleasedDate, locale) }} ({{ `${releasedAgo()}${t('years-ago')}` }})</p>
                <p>{{ t('genre') }}: {{ gameObject.gameGenre }}</p>
                <p>{{ t('developer') }}: {{ gameObject.gameDeveloper }}</p>
                <p>{{ t('publisher') }}: {{ gameObject.gamePublisher }}</p>
                <v-divider style="margin-top: 1%; margin-bottom: 1%"/>
                <p>{{ t('latest-version') + gameObject.gameLatestRevision }}</p>
                <a :href="gameObject.gameWebsite">{{ t('official-website') }}</a>
              </v-card-text>
            </v-card>

            <v-card
                class="mt-4 pa-3 rounded-xl"
                :title="gameObject.gameHeadline"
                variant="tonal"
                style="white-space: pre-line;"
            >
              <v-card-text>
                <MdPreview :modelValue="gameObject.gameDescription" theme="dark" />
              </v-card-text>
            </v-card>

            <v-card class="mt-4 pa-3 rounded-xl" :title="t('system-requirements')" variant="tonal">
              <v-card-text>
                {{ t('macos-system-requirements').replace(/\\n/g, '\n') }}
              </v-card-text>
              <v-card-text>
                {{ t('windows-system-requirements').replace(/\\n/g, '\n') }}
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
      <v-divider />
      <v-card-actions>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.md-editor {
  /* --md-color: #fff; */
  --md-bk-color: rgba(0, 0, 0, 0);
}
</style>