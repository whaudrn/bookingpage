<script setup>
const props = defineProps({
  step: { type: Number, required: true },
  bookingData: { type: Object, required: true }
})
const emit = defineEmits(['go-to-step'])
const steps = [
  { label: '매장', key: 'shop' },
  { label: '서비스', key: 'service' },
  { label: '디자이너', key: 'designer' },
  { label: '날짜', key: 'date' },
  { label: '정보입력', key: 'name' }
]

function isDone(key) {
  const value = props.bookingData[key]
  if (key === 'service') {
    return value?.service
  }
  return value
}

function displayValue(key) {
  const value = props.bookingData[key]
  if (key === 'service') {
    return value?.service || ''
  }
  if (key === 'date') {
    if (!value) return ''
    const dateObj = new Date(value)
    const text = `${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`
    return props.bookingData.time ? `${text} ${props.bookingData.time}` : text
  }
  return value
}

function goToStep(index) {
  emit('go-to-step', index + 1)
}
</script>

<template>
  <div class="progress-bar">
    <div v-for="(s, index) in steps" :key="s.key" class="progress-step"
      :class="{ done: isDone(s.key), active: step === index + 1 }">
      <span class="circle" @click="goToStep(index)">Step{{ index + 1 }}</span>
      <span class="label">
        {{ isDone(s.key) ? '' : s.label }}
        <span v-if="isDone(s.key)">{{ displayValue(s.key) }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.progress-step .circle {
  cursor: pointer;
}

.progress-bar {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  margin-bottom: 30px;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: #999;
}

.circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  font-weight: bold;
}

.progress-step.done .circle {
  background-color: #4caf50;
  color: white;
}

.progress-step.active .circle {
  background-color: #2196f3;
  color: white;
}

.progress-step.done,
.progress-step.active {
  color: #333;
}
</style>