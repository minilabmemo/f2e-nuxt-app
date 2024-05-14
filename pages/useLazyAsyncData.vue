<template>
  <div class="bg-blue py-24">
    <header class="flex flex-col items-center">
      <NuxtLink class="text-cyan-400" to="/fetch">前往 fetch</NuxtLink>
    </header>
    <div class="flex flex-col items-center">
      <p class="my-8 text-3xl text-gray-600">這裡是 /useLazyAsyncData</p>
      <p class="my-8 text-xl text-gray-600">雖然會先渲染，但是你會看到舊資料 13，等一下後變成 15(因為跳到別頁是 14)</p>
      <p class="my-8 text-xl text-gray-600">所以可以設定預設值“-”在請求回來前會顯示，提升使用者體驗</p>
      <h4>使用 useLazyAsyncData 接收資料</h4>
      {{ data }}

      {{ pending ? 'Loading' : data }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, pending } = useLazyAsyncData('count', () => $fetch('/api/count'));

// const { data } = useLazyAsyncData('count', () => $fetch('/api/count'), {
//   default: () => '-'
// });
</script>
