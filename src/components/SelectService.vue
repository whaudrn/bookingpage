<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ category: null, service: null, price: null, peopleCount: 1 })
  }
})

const emit = defineEmits(['update:modelValue'])

const categories = [
  {
    name: '커트',
    services: [
      { name: '커트A', price: 20000 },
      { name: '커트B', price: 25000 }
    ]
  },
  {
    name: '펌',
    services: [
      { name: '펌A', price: 80000 },
      { name: '펌B', price: 100000 }
    ]
  }
]

const selectedCategory = ref(props.modelValue.category)
const selectedService = ref(props.modelValue.service)
const selectedPrice = ref(props.modelValue.price)
const peopleCount = ref(props.modelValue.peopleCount || 1)

const totalPrice = computed(() => (selectedPrice.value || 0) * peopleCount.value)

function chooseCategory(category) {
  selectedCategory.value = category.name
  selectedService.value = null
  selectedPrice.value = null
  emitUpdate()
}

function chooseService(service) {
  selectedService.value = service.name
  selectedPrice.value = service.price
  emitUpdate()
}

function increasePeople() {
  peopleCount.value++
  emitUpdate()
}

function decreasePeople() {
  if (peopleCount.value > 1) {
    peopleCount.value--
    emitUpdate()
  }
}

function emitUpdate() {
  emit('update:modelValue', {
    category: selectedCategory.value,
    service: selectedService.value,
    price: selectedPrice.value,
    peopleCount: peopleCount.value,
    totalPrice: totalPrice.value
  })
}

const currentServices = computed(() => {
  const found = categories.find(c => c.name === selectedCategory.value)
  return found ? found.services : []
})

</script>

<template>
  <div class="select-service">
    <h2>카테고리를 선택해주세요</h2>
    <div class="category-list">
      <button
        v-for="category in categories"
        :key="category.name"
        :class="{ selected: selectedCategory === category.name }"
        @click="chooseCategory(category)"
      >
        {{ category.name }}
      </button>
    </div>

    <div v-if="selectedCategory" class="service-list">
      <h3>세부 서비스</h3>
      <button
        v-for="service in currentServices"
        :key="service.name"
        :class="{ selected: selectedService === service.name }"
        @click="chooseService(service)"
      >
        {{ service.name }} ({{ service.price.toLocaleString() }}원)
      </button>
    </div>

    <div v-if="selectedService" class="people-count">
      <h3>인원수</h3>
      <button @click="decreasePeople">-</button>
      <span>{{ peopleCount }}명</span>
      <button @click="increasePeople">+</button>
      <p>총 금액: {{ totalPrice.toLocaleString() }}원</p>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
}
.select-service {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.category-list,
.service-list {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
}

button.selected {
  background-color: aquamarine;
}

.people-count {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>