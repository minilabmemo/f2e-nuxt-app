<template>
  <div class="bg-blue py-24">
    <header class="flex flex-col items-center">
      <NuxtLink class="text-cyan-400" to="/fetch">前往 fetch</NuxtLink>
    </header>
    <div class="flex flex-col items-center">
      <p class="my-8 text-3xl text-gray-600">這裡是 /useAsyncData</p>
      <p class="my-8 text-xl text-gray-600">進來會發出 API，等待完成後數字加一</p>

      <h4>使用 useAsyncData 接收資料</h4>
      <div>{{ countData }}</div>
      <div>pending:{{ pending }}</div>
      <div>error:{{ error }}</div>
      <div>refresh:{{ refresh }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// const { data: countData } = await useAsyncData('count', () => $fetch('/api/count'));
// const { data: countData, pending, error, refresh } = await useAsyncData(() => $fetch('/api/count')); 第一個參數不給自動產生

const { data: countData, pending, error, refresh } = await useAsyncData('count', () => $fetch('/api/count'));
</script>
