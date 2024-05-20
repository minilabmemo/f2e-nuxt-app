// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },
  runtimeConfig: {
    public: {
      googleClientId: '518652066543-r8bq02r657e8jecoimpafelr7j48l2in.apps.googleusercontent.com'
    }
  }
});
