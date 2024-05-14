<template>
  <div class="bg-blue py-24">
    <header class="flex flex-col items-center">
      <NuxtLink class="text-cyan-400" to="/fetch">前往 fetch</NuxtLink>
    </header>
    <div class="flex flex-col items-center">
      <p class="my-8 text-3xl text-gray-600">這裡是 /fetchonly</p>

      <h4>使用$fetch 接收資料</h4>
      <h5>從別頁跳過來數字會加一</h5>
      <h5>
        但是刷新頁面的話，數字會先加一（沒看到 API 不知道哪來），後端 API 發出但等待中，完成後又加一
      </h5>
      {{ body }}
      {{ count }}
    </div>
  </div>
</template>

<script setup lang="ts">
const body = await $fetch('/api/hello');
const count = await $fetch('/api/count');
</script>
