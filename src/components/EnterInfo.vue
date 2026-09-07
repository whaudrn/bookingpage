<script setup>
const props = defineProps({
  name: { type: String, default: '' },
  email: { type: String, default: '' }
})

const emit = defineEmits(['update:name', 'update:email'])
</script>

<template>
  <div class="enter-info">
    <h1>예약자 정보 입력</h1>

    <div class="form-group">
      <label for="name">이름</label>
      <input
        id="name"
        type="text"
        placeholder="이름을 입력하세요"
        :value="name"
        @input="emit('update:name', $event.target.value)"
      />
    </div>

    <div class="form-group">
      <label for="email">이메일</label>
      <input
        id="email"
        type="email"
        placeholder="example@email.com"
        :value="email"
        @input="emit('update:email', $event.target.value)"
      />
    </div>
  </div>
</template>

<style scoped>
.enter-info {
  max-width: 400px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

label {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

input {
  padding: 12px 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #2196f3;
}
</style>