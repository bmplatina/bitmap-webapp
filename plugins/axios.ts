import axios from "axios";

export default defineNuxtPlugin(async function () {
    return {
        provide: {
            axios: axios,
        }
    }
});