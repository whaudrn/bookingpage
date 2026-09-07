<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const shops = ['강남점', '홍대점', '신촌점']

function chooseShop(shop) {
  emit('update:modelValue', shop)
}
</script>

<template>
  <div class="select-shop">
    <h2>매장을 선택해주세요</h2>
    <div class="shop-list">
      <button v-for="shop in shops" :key="shop" :class="{ selected: modelValue === shop }" @click="chooseShop(shop)">
        {{ shop }}
      </button>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 30px;
}
.select-shop {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.shop-list {
  display: flex;
  gap: 10px;
}

.shop-list button {
  padding: 10px 20px;
  font-size: 18px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
}

.shop-list button.selected {
  background-color: #4caf50;
  color: #fff;
}

.shop-list button:not(.selected):hover {
  background-color: #e0e7e5;
}
</style>