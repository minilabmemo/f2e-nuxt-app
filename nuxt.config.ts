// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/image'],
  image: {
    format: ['webp, png, jpg'], // default is ['webp']
    dir: 'assets/images'
  },
  devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },
  runtimeConfig: {
    jwtSignSecret: 'testjwtSignSecret',
    public: {
      googleClientId: '518652066543-r8bq02r657e8jecoimpafelr7j48l2in.apps.googleusercontent.com'
    }
  }
});
