<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import { useAuthStore, useSettingsStore } from "~/store";
import { storeToRefs } from "pinia";

const axios = useNuxtApp().$axios;
// import Cookies from "js-cookie";

const router = useRouter();
const { t } = useI18n();
const { userName, userId, bIsLoggedIn } = storeToRefs(useAuthStore());
const { bIsSidebarOpened } = storeToRefs(useSettingsStore());

const bIsSignInModalOpened = ref(false);
const bIsRegistering = ref(false);

const username = ref('');
const email = ref('');
const password = ref('');
const bShowPassword = ref(false);
const bIsTermsAgreed = ref(false);

const authFailedReasons = reactive({
  bIsFailed: false,
  result: '',
  reason: '',
});

const passwordRules = {
  required: (value: string) => !!value || 'Required.',
  min: (v: string) => v.length >= 8 || t('password-rules'),
  emailMatch: () => `The email and password you entered don't match`,
};

async function login(username: string, password: string) {
  try {
    // 2. Request Login
    // const loginRes = await fetch("https://api.prodbybitmap.com/api/auth/login", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     username,
    //     password,
    //   }),
    // });
    const loginRes = await axios.post("https://api.prodbybitmap.com/api/auth/login", new URLSearchParams({
      username: username,
      password: password,
    }).toString(), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    const loginData = await loginRes.data;

    if(loginData.login.result === "Success") {
      console.log("로그인 성공");
      bIsLoggedIn.value = true;

      // 유저 이름 저장
      userName.value = useCookie('overwikiUserName').value as string;

      // 유저 ID 번호 저장
      userId.value = Number(useCookie('overwikiUserId').value);

      bIsSignInModalOpened.value = false;
      authFailedReasons.bIsFailed = false;
    }

    else {
      console.error("로그인 실패:", loginData);
      bIsLoggedIn.value = false;
      authFailedReasons.bIsFailed = true;
      authFailedReasons.result = loginData.result;
      authFailedReasons.reason = loginData.reason;
    }
  }
  catch (error) {
    console.error("IPC 로그인 요청 실패:", error);
  }
}

async function createAccount(username: string, email: string, password: string) {
  try {
    // 2. Request Login
    // const registerRes = await fetch("https://api.prodbybitmap.com/api/auth/register", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email,
    //     username,
    //     password,
    //   }),
    // });
    const registerRes = await axios.post("https://api.prodbybitmap.com/api/auth/register", new URLSearchParams({
      email: email,
      username: username,
      password: password,
    }).toString(), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    const registerData = await registerRes.data;

    if(registerData.login.result === "Success") {
      console.log("로그인 성공");
      bIsLoggedIn.value = true;

      // 유저 이름 저장
      userName.value = useCookie('overwikiUserName').value as string;

      // 유저 ID 번호 저장
      userId.value = Number(useCookie('overwikiUserId').value);

      bIsSignInModalOpened.value = false;
      authFailedReasons.bIsFailed = false;
    }

    else {
      console.error("로그인 실패:", registerData);
      bIsLoggedIn.value = false;
      authFailedReasons.bIsFailed = true;
      authFailedReasons.result = registerData.result;
      authFailedReasons.reason = registerData.reason;
    }
  }
  catch (error) {
    console.error("IPC 로그인 요청 실패:", error);
  }
}

onMounted(() => {
  // bIsLoggedIn.value = (useCookie('overwikiToken').value as string).length > 5;
  userName.value = useCookie('overwikiUserName').value as string;
});
</script>

<template>
  <v-navigation-drawer
      v-model="bIsSidebarOpened"
      temporary
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
  >
    <v-list class="text-left">
      <v-list-subheader>{{ t('bitmap') }}</v-list-subheader>
      <v-list-item link :title="t('home')" prepend-icon="mdi-home" to="/" />
      <v-list-item
          href="//wiki.prodbybitmap.com"
          target="_blank" rel="noopener noreferrer" tag="a"
          :title="t('wiki')" prepend-icon="mdi-book-education"
      />
      <v-list-item
          href="//developer.prodbybitmap.com"
          target="_blank" rel="noopener noreferrer" tag="a"
          title="Bitmap Developer" prepend-icon="mdi-xml"
      />
      <v-list-item
          href="//youtube.com/@prodbybitmap"
          target="_blank" rel="noopener noreferrer" tag="a"
          title="Official YouTube" prepend-icon="mdi-youtube"
      />
      <v-divider />
      <v-list-subheader>{{ t('bitmap-store') }}</v-list-subheader>
      <v-list-item link :title="t('games')" prepend-icon="mdi-gamepad" to="/games" />
<!--      <v-list-item link :title="t('game-submit')" prepend-icon="mdi-form-select" @click="bIsLoggedIn ? router.push('/games/submit') : bIsSignInModalOpened = true" />-->
      <v-list-item link :title="t('game-submit')" prepend-icon="mdi-form-select" to="/games/submit" />
      <v-list-item link :title="t('games-pending')" prepend-icon="mdi-account-clock-outline" to="/games/pending" />
      <v-divider />
      <v-list-subheader>{{ t('accounts') + ' & ' + t('settings') }}</v-list-subheader>
      <v-list-item v-if="bIsLoggedIn" link :title="t('accounts')" prepend-icon="mdi-account" to="/accounts" />
      <v-list-item v-else link :title="t('login')" prepend-icon="mdi-login" @click="bIsSignInModalOpened = true" />
      <v-list-item link :title="t('settings')" prepend-icon="mdi-cog" to="/settings" />
    </v-list>
  </v-navigation-drawer>

  <v-dialog v-model="bIsSignInModalOpened" max-width="448">
    <v-card
        title="Bitmap ID"
        class="mx-auto pa-12 pb-8"
        elevation="8"
        rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">{{ t('id') }}</div>
      <v-text-field
          v-model="username"
          clearable
          density="compact"
          :label="t('id')"
          @keyup.enter="login(username, password)" />
      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        {{ t('password') }}
        <a
            class="text-caption text-decoration-none text-blue"
            href="https://wiki.prodbybitmap.com/wiki/특수:비밀번호재설정"
            rel="noopener noreferrer"
            target="_blank"
        >
          {{ t('forgot-password') }}</a>
      </div>
      <v-text-field
          v-model="password"
          :label="t('password')"
          density="compact"
          clearable
          :append-icon="bShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[passwordRules.required, passwordRules.min]"
          :type="bShowPassword ? 'text' : 'password'"
          :hint="t('password-rules')"
          name="input-10-1"
          counter
          @click:append="bShowPassword = !bShowPassword"
          @keyup.enter="login(username, password)" />
      <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
      >
        <v-card>
          <v-card-title>
            {{ authFailedReasons.bIsFailed ? t(authFailedReasons.result) : t('before-continuing') }}
          </v-card-title>
          <v-card-text class="text-medium-emphasis text-caption">
            {{ authFailedReasons.bIsFailed ? t(authFailedReasons.reason) : t('login-notification') }}
          </v-card-text>
        </v-card>
      </v-card>
      <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="login(username, password)"
          prepend-icon="mdi-login"
      >
        {{ t('login') }}
      </v-btn>

      <v-card-text class="text-center">
        <a
            class="text-blue text-decoration-none"
            href="//wiki.prodbybitmap.com/w/index.php?title=특수:계정만들기"
            rel="noopener noreferrer"
            target="_blank"
        >
          {{ t('register') }} <v-icon icon="mdi-chevron-right" />
        </a>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>