<template>
  <div class="bg-white py-24">
    <div class="flex flex-col items-center">
      <h1 class="text-6xl font-semibold text-gray-800">這裡是登入頁面</h1>
      <ClientOnly>
        <GoogleLogin :callback="callback" />
      </ClientOnly>

      <button type="button" @click="Logout">登出</button>
    </div>
  </div>
</template>
<script setup>
import {googleLogout} from 'vue3-google-login';
const callback = (response) => {
  console.log(response);
  // {clientId: 'xxx', credential: 'xxx', select_by: 'btn_confirm'} //TODO 接著就可以拿到使用者資訊
};
function Logout() {
  console.log('Logout'); // FIXME 按下去之後，我的所有 google 帳號就會被登出惹～～～？！！
  googleLogout();
}
</script>
