<script setup>
</script>

<template>
  <div class="home">
    <h1>Hair Salon</h1>
    <RouterLink to="/booking">
      <button>예약하기</button>
    </RouterLink>
  </div>
</template>

<style scoped>
button {
  padding: 20px 50px;
  font-size: 50px;
  background-color: #ec870e;
  color: #fff;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
}
</style>