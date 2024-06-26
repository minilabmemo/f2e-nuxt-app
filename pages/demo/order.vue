<template>
  <div>
    <div class="text-3xl">複選框</div>

    <div>Checked names: {{ checkedNames }}</div>

    <input id="jack" v-model="checkedNames" type="checkbox" value="Jack" />
    <label for="jack">Jack</label>

    <input id="john" v-model="checkedNames" type="checkbox" value="John" />
    <label for="john">John</label>

    <input id="mike" v-model="checkedNames" type="checkbox" value="Mike" />
    <label for="mike">Mike</label>
    <div class="text-3xl">全選框</div>
    <input v-model="selectAll" type="checkbox" /> Select All
    <div v-for="(item, index) in items" :key="index"><input v-model="item.selected" type="checkbox" /> {{ item.name }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const checkedNames = ref([]);

// 選單內容
const items = ref([
  { id: 1, name: 'Item 1', selected: false },
  { id: 2, name: 'Item 2', selected: false },
  { id: 3, name: 'Item 3', selected: false },
  { id: 4, name: 'Item 4', selected: false }
]);

const allSelected = computed({
  get() {
    return items.value.every((item) => item.selected);
  },
  set(value) {
    items.value.forEach((item) => {
      item.selected = value;
    });
  }
});

const selectAll = computed({
  get() {
    return allSelected.value;
  },
  set(value) {
    allSelected.value = value;
  }
});
</script>
