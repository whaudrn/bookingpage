<script setup>
const props = defineProps({
  bookingData: {
    type: Object,
    required: true
  }
})
const weekDayNames = ['일', '월', '화', '수', '목', '금', '토']

function formatDate(d) {
  if (!d) return ''
  const dateObj = new Date(d)
  return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')} (${weekDayNames[dateObj.getDay()]})`
}
</script>

<template>
  <div class="complete">
    <h2>예약이 완료되었습니다</h2>
    <ul>
      <li>매장: {{ bookingData.shop }}</li>
      <li>서비스:
        <p>- 카테고리 : {{ bookingData.service.category }}</p>
        <p>- 서비스 : {{ bookingData.service.service}}</p>
        <p>- 비용 : {{ bookingData.service.price }}</p>
        <p>- 인원 : {{ bookingData.service.peopleCount }}</p>
        <p>- 총 비용 : {{ bookingData.service.totalPrice }}</p>
      </li>
      <li>디자이너: {{ bookingData.designer }}</li>
      <li>날짜: {{ formatDate(bookingData.date) }}</li>
      <li>시간: {{ bookingData.time }}</li>
      <li>이름: {{ bookingData.name }}</li>
      <li>이메일: {{ bookingData.email }}</li>
    </ul>
  </div>
</template>
<style scoped>
h2 {
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
}
li {
  font-size: 20px;
  margin-bottom: 10px;
}

</style>