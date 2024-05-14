<template>
  <div class="bg-blue py-24">
    <header class="flex flex-col items-center">
      <NuxtLink class="text-cyan-400" to="/about">前往 about</NuxtLink>
    </header>
    <div class="flex flex-col items-center">
      <p class="my-8 text-3xl text-gray-600">這裡是 /fetch</p>
      <p><NuxtLink class="text-cyan-400" to="/fetchonly">前往 fetchonly</NuxtLink> 使用$fetch 獲取資料</p>
      <p>
        <NuxtLink class="text-cyan-400" to="/useAsyncData">前往 useAsyncData</NuxtLink>
        使用 useAsyncData +$fetch 獲取資料
      </p>
      <NuxtLink class="text-cyan-400" to="/usefetch">前往 usefetch</NuxtLink>

      <NuxtLink class="text-cyan-400" to="/useLazyAsyncData">前往 useLazyAsyncData</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
