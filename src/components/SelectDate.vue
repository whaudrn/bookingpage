<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  date: { type: [Date, String], default: null },
  time: { type: String, default: null }
})
const emit = defineEmits(['update:date', 'update:time'])


const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const timeSlots = ['10:00', '11:00', '12:00', '13:30', '14:30', '15:30', '16:30', '17:30', '18:30']

const today = new Date()
const viewYear = ref(today.getFullYear())
const viewMonth = ref(today.getMonth())

const selectedDay = ref(null)
const selectedDate = ref(null)
const selectedSlot = ref(null)

const firstDay = computed(() => new Date(viewYear.value, viewMonth.value, 1).getDay())
const lastDate = computed(() => new Date(viewYear.value, viewMonth.value + 1, 0).getDate())

const bookingDayText = computed(() => {
  if (!selectedDate.value) return ''
  return `${viewYear.value}-${String(viewMonth.value + 1).padStart(2, "0")}-${String(selectedDay.value).padStart(2, "0")}(${weekDayNames[selectedDate.value.getDay()]})`
})

function isToday(d) {
  return (
    viewYear.value === today.getFullYear() &&
    viewMonth.value === today.getMonth() &&
    d === today.getDate()
  )
}

function resetSelection() {
  selectedDay.value = null
  selectedDate.value = null
  selectedSlot.value = null
}

function prevMonth() {
  resetSelection()
  viewMonth.value--
  if (viewMonth.value < 0) {
    viewMonth.value = 11
    viewYear.value--
  }
}

function nextMonth() {
  resetSelection()
  viewMonth.value++
  if (viewMonth.value > 11) {
    viewMonth.value = 0
    viewYear.value++
  }
}

function selectDate(d) {
  selectedDay.value = d
  selectedDate.value = new Date(viewYear.value, viewMonth.value, d)
  selectedSlot.value = null
  emit('update:date', selectedDate.value)
  emit('update:time', null)
}

function selectSlot(t) {
  selectedSlot.value = t
  emit('update:time', t)
}
</script>


<template>
  <div class="wrap">
    <h1>예약 날짜 선택</h1>
    <div class="calendar">
      <div class="calendar__header">
        <button aria-label="이전 달" @click="prevMonth"><i class="ti ti-chevron-left"></i></button>
        <span>{{ monthNames[viewMonth] }} {{ viewYear }}</span>
        <button aria-label="다음 달" @click="nextMonth"><i class="ti ti-chevron-right"></i></button>
      </div>

      <div class="calendar__weekdays">
        <span v-for="w in weekDayNames" :key="w">{{ w }}</span>
      </div>

      <div class="calendar__days">
        <div v-for="n in firstDay" :key="'empty-' + n"></div>
        <button v-for="d in lastDate" :key="d" :class="{ 'is-selected': selectedDay === d, 'today': isToday(d) }"
          @click="selectDate(d)">
          {{ d }}
        </button>
      </div>

      <div class="calendar__slots" v-if="selectedDate">
        <div class="calendar__slot-grid">
          <button v-for="t in timeSlots" :key="t" :class="{ 'is-selected': selectedSlot === t }" @click="selectSlot(t)">
            {{ t }}
          </button>
        </div>
      </div>
    </div>

    <div class="currentBooking">
      <p class="bookingDay">{{ bookingDayText }}</p>
      <p class="bookingTime">{{ selectedSlot ? selectedSlot : '' }}</p>
    </div>
  </div>
</template>

<style scoped>
@import '../assets/calendar.css';

h1 {
  text-align: center;
  font-size: 30px;
}
</style>
