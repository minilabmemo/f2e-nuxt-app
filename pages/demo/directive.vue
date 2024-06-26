<script setup>
// 在模板中启用 v-focus 在 <script setup> 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令
// 應用場景 https://vue3js.cn/interview/vue/directive.html#%E4%B8%89%E3%80%81%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF
// 3.图片懒加载 v-lazy
import { onMounted, ref } from 'vue';

import defaultSrc from '@/assets/images/tw.png'; // 假設加載中的圖片存放在 assets 文件夾中
const vFocus = {
  mounted: (el) => el.focus()
};
// 2.表单防止重复提交 v-throttle
function vThrottle(el, binding) {
  let throttleTime = binding.value; // 節流時間
  if (!throttleTime) {
    // 用戶若不設置節流時間，則默認 2s
    throttleTime = 2000;
  }
  let cbFun;
  el.addEventListener(
    'click',
    (event) => {
      if (!cbFun) {
        // 第一次執行
        cbFun = setTimeout(() => {
          cbFun = null;
        }, throttleTime);
        console.log('cbFun');
      } else {
        event && event.stopImmediatePropagation();
        console.log('stopImmediatePropagation');
      }
    },
    true
  );
}
// 3.图片懒加载 v-lazy
const init = (el, val, def) => {
  el.setAttribute('data-src', val);
  el.setAttribute('src', def);
  // 設置圖片加載失敗時的處理
  el.onerror = () => {
    el.setAttribute('src', def);
  };
};

const observe = (el) => {
  const io = new IntersectionObserver((entries) => {
    const realSrc = el.dataset.src;
    if (entries[0].isIntersecting) {
      if (realSrc) {
        el.src = realSrc;
        el.removeAttribute('data-src');
      }
    }
  });
  io.observe(el);
};

const load = (el) => {
  const windowHeight = document.documentElement.clientHeight;
  const elTop = el.getBoundingClientRect().top;
  const elBtm = el.getBoundingClientRect().bottom;
  const realSrc = el.dataset.src;
  if (elTop - windowHeight < 0 && elBtm > 0) {
    if (realSrc) {
      el.src = realSrc;
      el.removeAttribute('data-src');
    }
  }
};

const throttle = (fn, delay) => {
  let timer;
  let prevTime;
  return function (...args) {
    const currTime = Date.now();
    const context = this;
    if (!prevTime) prevTime = currTime;
    clearTimeout(timer);

    if (currTime - prevTime > delay) {
      prevTime = currTime;
      fn.apply(context, args);
      clearTimeout(timer);
      return;
    }

    timer = setTimeout(function () {
      prevTime = Date.now();
      timer = null;
      fn.apply(context, args);
    }, delay);
  };
};

const listenerScroll = (el) => {
  const handler = throttle(load, 300);
  load(el);
  window.addEventListener('scroll', () => {
    handler(el);
  });
};

function useLazyLoad(defaultSrc) {
  return {
    mounted(el, binding) {
      init(el, binding.value, defaultSrc);
      if ('IntersectionObserver' in window) {
        observe(el);
      } else {
        listenerScroll(el);
      }
    }
  };
}

const vLazy = useLazyLoad(defaultSrc);
</script>

<template>
  <div>
    <h1 class="text-3xl">自訂指令練習</h1>
    <code>程式碼請看檔案</code>

    <h1 class="text-xl">1. 輸入框獲取焦點 v-focus</h1>
    <input v-focus class="border" />
    <h1 class="text-xl">2.表单防止重复提交 v-throttle</h1>
    <code>throttle 節流閥 抓斗 確保在一段特定的時間內最多只調用一次</code>
    <div>以下按鈕兩秒內只能執行一次</div>
    <button v-throttle="2000" class="border p-2 border-red-900">Click Me</button>
    <h1 class="text-xl">3.图片懒加载 v-lazy</h1>
    <code
      >初始狀態：所有圖片的 src 都被設置為加載中圖片 當用戶滾動頁面或圖片進入視窗範圍時，IntersectionObserver 會監測到圖片進入視窗，並將真正的圖片 URL 設置為 src 來加載圖片。節流：滾動事件的處理是經過節流的，避免了滾動過於頻繁導致的性能問題。
    </code>
    <div>沒有被放在 ClientOnly 一開始會有點問題，顯示找不到圖片</div>
    <ClientOnly>
      <img v-lazy="'https://fakeimg.pl/250x100/ff0000/'" alt="Lazy Loaded Image" />
    </ClientOnly>
  </div>
</template>
