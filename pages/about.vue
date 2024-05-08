<template>
  <div class="bg-blue py-24">
    <div class="flex flex-col items-center">
      <p class="my-8 text-3xl text-gray-600">這裡是 /about</p>
      <!-- NOTE: AppWelcome vs LazyAppWelcome 差異 -->
      <input id="show-button" v-model="show" name="show-button" type="checkbox" class="h-5 w-5" />
      <label for="show-button" class="ml-2 block text-base text-slate-800">顯示按鈕</label>
      <!-- <AppWelcome v-if="show" /> -->
      <!-- <LazyAppWelcome v-if="show" /> -->

      <!-- NOTE: AppWelcome vs ClientOnly 差異 -->
      <AppWelcome />
      <ClientOnly>
        <AppWelcome />
        <template #fallback>
          <p class="my-6 flex justify-center">載入中...</p>
        </template>
      </ClientOnly>

      <!-- NOTE: 使用 AppClient.client.vue 差異 -->
      <AppClient />
      <!-- NOTE: 使用 AppClientServer.client.vue 與 AppClientServer.server.vue 差異 -->
      <AppClientServer />

      {{ data }}
    </div>
  </div>
</template>

<script setup lang="ts">
const show = ref(false);
const { data } = await useFetch('/api/hello');
</script>
