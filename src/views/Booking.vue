<script setup>
import { ref, computed } from 'vue'
import SelectShop from '../components/SelectShop.vue'
import SelectService from '../components/SelectService.vue'
import SelectDesigner from '../components/SelectDesigner.vue'
import SelectDate from '../components/SelectDate.vue'
import EnterInfo from '../components/EnterInfo.vue'
import BookingComplete from '../components/BookingComplete.vue'
import StepProgress from '../components/StepProgress.vue'

const step = ref(1)
const isTransitioning = ref(false)

const bookingData = ref({
  shop: null,
  service: {
    category: null,
    service: null,
    price: null,
    peopleCount: 1,
    totalPrice: 0
  },
  designer: null,
  date: null,
  time: null,
  name: '',
  email: ''
})

const transitionName = ref('slide-next')

function nextStep() {
  transitionName.value = 'slide-next'
  step.value++
}

function prevStep() {
  transitionName.value = 'slide-prev'
  step.value--
}


let touchStartX = 0
let touchStartY = 0

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX
  touchStartY = e.changedTouches[0].screenY
}

function handleTouchEnd(e) {
  const touchEndX = e.changedTouches[0].screenX
  const touchEndY = e.changedTouches[0].screenY
  const diffX = touchStartX - touchEndX
  const diffY = touchStartY - touchEndY

  if (Math.abs(diffX) < 50) return
  if (Math.abs(diffX) < Math.abs(diffY)) return

  if (diffX > 0 && step.value < 6) {
    transitionName.value = 'slide-next'
    nextStep()
  } else if (diffX < 0 && step.value > 1) {
    transitionName.value = 'slide-prev'
    prevStep()
  }
}


const isBookingComplete = computed(() => {
  return (
    bookingData.value.shop &&
    bookingData.value.service?.service &&
    bookingData.value.designer &&
    bookingData.value.date &&
    bookingData.value.time &&
    bookingData.value.name &&
    bookingData.value.email
  )
})

function submitBooking() {
  // 나중에 여기서 실제 API 호출 (예: fetch('/api/bookings', { method: 'POST', body: ... }))
  console.log('제출된 예약 데이터:', bookingData.value)
  transitionName.value = 'slide-next'
  step.value = 6
}
</script>

<template>
  <div class="booking" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <RouterLink to="/">
      <button>메인으로</button>
    </RouterLink>

    <StepProgress :step="step" :booking-data="bookingData" @go-to-step="(n) => step = n" />

    <div class="slide-container">
      <Transition :name="transitionName">
        <div :key="step" class="slide-content">
          <SelectShop v-if="step === 1" v-model="bookingData.shop" />
          <SelectService v-if="step === 2" v-model="bookingData.service" />
          <SelectDesigner v-if="step === 3" v-model="bookingData.designer" />
          <SelectDate v-if="step === 4" v-model:date="bookingData.date" v-model:time="bookingData.time" />
          <EnterInfo v-if="step === 5" v-model:name="bookingData.name" v-model:email="bookingData.email" />
          <BookingComplete v-if="step === 6" :booking-data="bookingData" />
        </div>
      </Transition>
    </div>

    <div class="btnWrap">
      <button v-if="isBookingComplete" v-show="!isTransitioning" @click="submitBooking" class="submitBtn">예약 하기</button>
    </div>
  </div>
</template>

<style scoped>
.invisible {
  visibility: hidden;
}

.booking {
  width: 100vW;
  height: 100vh;
  padding: 30px;
}

.btnWrap {
  margin-top: 20px;
  display: flex;
  justify-content: center;

}

.btnWrap button {

  padding: 5px 10px;
  font-size: 30px;
  background-color: #2196f3;
  border-radius: 10px;
  color: #fff;
}

.progress-bar {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  border-bottom: 1px solid #eee;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: #999;
}

.circle {
  width: 30px;
  height: 30px;
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

.slide-container {
  position: relative;
  overflow: hidden;
  min-height: 500px;
  /* 실제 컨텐츠 최대 높이 보고 조절 */
}

.slide-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
  position: absolute;
  width: 100%;
}

.slide-next-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-prev-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>