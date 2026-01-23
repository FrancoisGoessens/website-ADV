<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0 items-center space-x-2">
          <div
            class="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl"
          >
            ADV
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <div
            class="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-full border border-gray-200/30 dark:border-gray-700/30"
          >
            <div class="relative">
              <div
                :class="[
                  'w-3 h-3 rounded-full',
                  isOpen ? 'bg-green-500' : 'bg-red-500',
                ]"
              ></div>
              <div
                :class="[
                  'absolute inset-0 w-3 h-3 rounded-full animate-ping opacity-75',
                  isOpen ? 'bg-green-500' : 'bg-red-500',
                ]"
              ></div>
            </div>

            <span class="text-sm font-medium text-gray-900 dark:text-white">
              {{ isOpen ? "Ouvert" : "Fermé" }} •
            </span>

            <span class="text-sm text-gray-900 dark:text-white">
              {{ statusText }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

let interval;
const isOpen = ref(false);
const statusText = ref("");

// Horaires
const schedule = {
  0: null, // Dimanche
  1: null,
  2: {
    morning: { start: "09:30", end: "12:00" },
    afternoon: { start: "14:30", end: "18:30" },
  },
  3: {
    morning: { start: "09:30", end: "12:00" },
    afternoon: { start: "14:30", end: "18:30" },
  },
  4: {
    morning: { start: "09:30", end: "12:00" },
    afternoon: { start: "14:30", end: "18:30" },
  },
  5: {
    morning: { start: "09:30", end: "12:00" },
    afternoon: { start: "14:30", end: "18:30" },
  },
  6: {
    morning: { start: "10:00", end: "12:00" },
    afternoon: { start: "14:30", end: "17:30" },
  },
};

// Convertir hh:mm en minutes
const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

// Vérifier si ouvert
const checkStatus = () => {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  const todaySchedule = schedule[day];

  // Fermé ajd
  if (!todaySchedule) {
    isOpen.value = false;
    // Prochain jour ouvert
    const nextDay = getNextOpenDay(day);
    statusText.value =
      nextDay === "demain" ? "Ouverture demain 09:30" : `Ouverture ${nextDay}`;
    return;
  }

  const morningStart = timeToMinutes(todaySchedule.morning.start);
  const morningEnd = timeToMinutes(todaySchedule.morning.end);
  const afternoonStart = timeToMinutes(todaySchedule.afternoon.start);
  const afternoonEnd = timeToMinutes(todaySchedule.afternoon.end);

  // Ouvert matin
  if (currentMinutes >= morningStart && currentMinutes < morningEnd) {
    isOpen.value = true;
    statusText.value = `jusqu'à ${todaySchedule.morning.end}`;
  }
  // Pause midi
  else if (currentMinutes >= morningEnd && currentMinutes < afternoonStart) {
    isOpen.value = false;
    statusText.value = `Ouverture ${todaySchedule.afternoon.start}`;
  }
  // Ouvert aprem
  else if (currentMinutes >= afternoonStart && currentMinutes < afternoonEnd) {
    isOpen.value = true;
    statusText.value = `jusqu'à ${todaySchedule.afternoon.end}`;
  }
  // Fermé
  else {
    isOpen.value = false;
    if (currentMinutes < morningStart) {
      // Avant ouverture
      statusText.value = `Ouverture ${todaySchedule.morning.start}`;
    } else {
      // Vérifier lendemain
      const tomorrow = (day + 1) % 7;
      const tomorrowSchedule = schedule[tomorrow];

      if (tomorrowSchedule) {
        // Demain ouvert
        statusText.value = `Ouverture demain ${tomorrowSchedule.morning.start}`;
      } else {
        // Demain fermé
        const nextOpenDay = getNextOpenDay(day);
        statusText.value = `Ouverture ${nextOpenDay}`;
      }
    }
  }
};

// Prochain jour ouvert
const getNextOpenDay = (currentDay) => {
  const days = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];

  for (let i = 1; i <= 7; i++) {
    const nextDay = (currentDay + i) % 7;
    const nextSchedule = schedule[nextDay];

    if (nextSchedule) {
      const dayName = days[nextDay];
      const openingTime = nextSchedule.morning.start;
      return `${dayName} ${openingTime}`;
    }
  }

  return "bientôt";
};

onMounted(() => {
  checkStatus();
  interval = setInterval(checkStatus, 60000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>
