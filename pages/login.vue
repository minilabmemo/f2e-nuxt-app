<template>
  <div class="bg-white py-24">
    <div class="flex flex-col items-center">
      <h1 class="text-6xl font-semibold text-gray-800">這裡是登入頁面</h1>
      <ClientOnly>
        <GoogleLogin :callback="callback" />
      </ClientOnly>
    </div>
  </div>
</template>
<script setup>
const callback = (response) => {
  console.log(response);
  // {clientId: 'xxx', credential: 'xxx', select_by: 'btn_confirm'} //TODO 接著就可以拿到使用者資訊
};
</script>
