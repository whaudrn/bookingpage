<script setup>
const designers = ['디자이너A', '디자이너B', '디자이너C']
const props = defineProps({
  modelValue: {
    type: String,
    defaults: null
  }
})

const emit = defineEmits(['update:modelValue'])
function chooseDesigner(designer) {
  emit('update:modelValue', designer)
}
</script>

<template>
  <div>
    <h2>디자이너 선택</h2>
    <div class="btnWrap">
      <button v-for="designer in designers" :key="designer" :class="{ selected: modelValue === designer }" @click="chooseDesigner(designer)">{{ designer
      }}</button>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 30px;
  text-align: center;
}

.btnWrap {
  margin: 30px 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btnWrap button {
  padding: 10px 20px;
  font-size: 18px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
}

.btnWrap button.selected {
  background-color: #4caf50;
  color: #fff;
}

.btnWrap button:not(.selected):hover {
  background-color: #e0e7e5;
}
</style>