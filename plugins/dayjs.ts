import dayjs from 'dayjs';

const now = dayjs();
const today = dayjs(now).format('YYYY-MM-DD');

export default defineNuxtPlugin(async function() {
    return {
        provide: {
            todayProvide: today,
        }
    }
});