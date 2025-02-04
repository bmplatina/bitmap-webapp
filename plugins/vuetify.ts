// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { en, ko } from "vuetify/locale";

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        locale: {
            locale: "ko",
            fallback: "en",
            messages: { ko, en },
        },
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: { mdi },
        },
        theme: {
            defaultTheme: 'dark',
            // themes: {
            //   light: {
            //     colors: {
            //       primary: '#6200EE',
            //       secondary: '#03DAC6',
            //     }
            //   }
            // }
        },
        components,
        directives,
    })
    app.vueApp.use(vuetify)
})
