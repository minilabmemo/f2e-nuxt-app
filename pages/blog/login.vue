<template>
  <div class="bg-bl bg-white py-24">
    <div class="flex flex-col items-start">
      <h1 class="text-xl font-semibold text-gray-800">這裡是部落格登入頁面</h1>

      <div class="">使用 Google 繼續 驗證 Access Token 並取得使用者資訊</div>
      <button type="button" class="py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none" @click="handleGoogleLoginAndGetInfo">使用 Google 繼續</button>
      <div>可以使用其他方式取的 TBD</div>
      <hr />
      <h4>登出</h4>
      <button type="button" class="py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none" @click="Logout">登出</button>
      <div>使用者資訊：{{ userInfo }}</div>
    </div>
  </div>
</template>
<script setup>
import { googleLogout, googleTokenLogin } from 'vue3-google-login';

const runtimeConfig = useRuntimeConfig();
const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public;

function Logout() {
  console.log('Logout'); // FIXME 按下去之後，我的所有 google 帳號就會被登出惹～～～？！！
  googleLogout();
}

const userInfo = ref();

const handleGoogleLoginAndGetInfo = async () => {
  const accessToken = await googleTokenLogin({
    clientId: GOOGLE_CLIENT_ID
  })
    .then((response) => response?.access_token)
    .catch((err) => console.log(err));
  if (!accessToken) {
    return '登入失敗';
  }
  console.log('accessToken', accessToken);

  const { data } = await useFetch('/api/auth/db/user', {
    method: 'POST',
    body: {
      accessToken
    },
    initialCache: false
  });
  console.log('data', data.value);

  userInfo.value = data.value;
};
</script>
