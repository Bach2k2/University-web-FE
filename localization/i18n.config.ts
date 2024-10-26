import en from './languages/en';
import vi from './languages/vi'
export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
      en,
      vi
    }
}))