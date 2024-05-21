<template>
  <div class="bg-bl bg-white py-24">
    <div class="flex flex-col items-start">
      <h1 class="text-xl font-semibold text-gray-800">這裡是登入頁面</h1>
      <h4>利用 GoogleLogin 觸發 callback</h4>
      <div class="">拿到 credential</div>
      <ClientOnly>
        <GoogleLogin :callback="callback" />
      </ClientOnly>
      <div class="">拿到 credential 加上一鍵登入 prompt</div>
      <ClientOnly>
        <GoogleLogin :callback="callback" prompt />
      </ClientOnly>
      <div class="">拿到 Access Token</div>
      <ClientOnly>
        <GoogleLogin :callback="callback" popup-type="TOKEN" />
      </ClientOnly>
      <div class="">可以自訂按鈕 進 slot</div>

      <hr />
      <h4>利用自訂的事件觸發</h4>
      <div class="">使用 Google 繼續 [拿到 Access Token]</div>
      <button type="button" class="py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none" @click="handleGoogleLogin">使用 Google 繼續</button>
      <div class="">使用 Google 繼續 [拿到 Auth Code]</div>
      <button class="py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none" type="button" @click="handleGoogleAuthCodeLogin">使用 Google 繼續 [auth]</button>
      <hr />
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
import { googleAuthCodeLogin, googleLogout, googleTokenLogin } from 'vue3-google-login';

const runtimeConfig = useRuntimeConfig();
const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public;

const callback = (response) => {
  console.log(response);
  console.log(response);
  // {clientId: 'xxx', credential: 'xxx', select_by: 'btn_confirm'} //TODO 接著就可以拿到使用者資訊
  // {"access_token": "xx""   "token_type": "Bearer","expires_in": 3599,"scope": "email profile ...","authuser": "0","prompt": "none"}
};

const handleGoogleLogin = () => {
  googleTokenLogin({
    clientId: GOOGLE_CLIENT_ID
  }).then((response) => {
    console.log(response);
  });
};
const handleGoogleAuthCodeLogin = () => {
  googleAuthCodeLogin({
    clientId: GOOGLE_CLIENT_ID
  }).then((response) => {
    console.log(response); // 取得 Auth Code。{code:'xx',scope:'email,profile,openid...'}
  });
};
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

  const { data } = await useFetch('/api/auth/google', {
    method: 'POST',
    body: {
      accessToken
    },
    initialCache: false
  });

  userInfo.value = data.value;
};
</script>
