<template>
  <div class="bg-blue py-24">
    <header class="flex flex-col items-center">
      <NuxtLink class="text-cyan-400" to="/fetch">前往 fetch</NuxtLink>
    </header>
    <div class="flex flex-col items-center">
      <p class="my-8 text-3xl text-gray-600">這裡是 /about</p>
      <!-- NOTE: AppWelcome vs LazyAppWelcome 差異 -->
      <input id="show-button" v-model="show" name="show-button" type="checkbox" class="h-5 w-5" />
      <label for="show-button" class="ml-2 block text-base text-slate-800">顯示按鈕</label>
      <!-- <AppWelcome v-if="show" /> -->
      <!-- <LazyAppWelcome v-if="show" /> -->

      <!-- NOTE: AppWelcome vs ClientOnly 差異 -->
      <div class="flex">
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
      </div>
    </div>

    <div class="flex flex-col items-center bg-red-100">
      <h3>圖片</h3>
      <div class="flex">
        <div class="">
          <h4>NuxtImg public</h4>
          <div>more.svg<NuxtImg src="/images/more.svg" width="100" /></div>
          <div>tailwind.png<NuxtImg src="/images/tailwind.png" width="100" /></div>
        </div>
        <div class="">
          <h4>NuxtImg assets</h4>

          <div>/tw.png <NuxtImg src="/tw.png" width="100" /></div>
          <div>/more.svg<NuxtImg src="/more.svg" width="100" /></div>
        </div>
        <div class="">
          <h4>img assets</h4>
          <div>/tw.png <img src="/assets/images/tw.png" width="100" /></div>
          <div>/more.svg<img src="/assets/images/more.svg" width="100" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const show = ref(false);
</script>
