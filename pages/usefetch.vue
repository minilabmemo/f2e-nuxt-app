<template>
  <div class="bg-blue py-24">
    <header class="flex flex-col items-center">
      <NuxtLink class="text-cyan-400" to="/fetch">前往 fetch</NuxtLink>
    </header>
    <div class="flex flex-col items-center">
      <p class="my-8 text-3xl text-gray-600">這裡是 /usefetch</p>

      <h4>使用$useFetch 接收資料</h4>

      {{ data }}
      {{ count }}
      pending:{{ pending }}
      <div>{{ pending ? 'Loading' : count }}</div>
      <button class="bg-blue-100" @click="handleRefresh">Refresh data</button>
      <button :disabled="refreshing" @click="refreshAll">Refetch All Data</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/hello');
// const { data, refresh } = await useFetch('/api/hello');
// const count = await useFetch('/api/count');
const { data: count, pending, refresh } = await useFetch('/api/count');
const handleRefresh = async () => {
  await refresh();
};

const refreshing = ref(false);
const refreshAll = async () => {
  refreshing.value = true;
  try {
    await refreshNuxtData();
  } finally {
    refreshing.value = false;
  }
};
</script>
