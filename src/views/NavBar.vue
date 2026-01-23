<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/20 dark:border-gray-700/20"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0">
          <a href="#" class="flex items-center space-x-2">
            <div
              class="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            >
              ADV
            </div>
          </a>
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
              {{ isOpen ? "Ouvert" : "Fermé" }}
            </span>

            <span class="hidden md:block text-sm text-gray-900 dark:text-white">
              • {{ isOpen ? "jusqu'à 18h30" : "dès demain 9h30" }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isOpen = ref(false);
const currentTime = ref("");
let interval = null;

// Vérifier si magasin ouvert
const checkIfOpen = () => {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  // Horaires
  const schedule = {
    0: null, // Dimanche
    1: null,
    2: [
      { start: 9.5 * 60, end: 12 * 60 },
      { start: 14.5 * 60, end: 18.5 * 60 },
    ],
    3: [
      { start: 9.5 * 60, end: 12 * 60 },
      { start: 14.5 * 60, end: 18.5 * 60 },
    ],
    4: [
      { start: 9.5 * 60, end: 12 * 60 },
      { start: 14.5 * 60, end: 18.5 * 60 },
    ],
    5: [
      { start: 9.5 * 60, end: 12 * 60 },
      { start: 14.5 * 60, end: 18.5 * 60 },
    ],
    6: [
      { start: 10 * 60, end: 12 * 60 },
      { start: 14.5 * 60, end: 17.5 * 60 },
    ],
  };

  const todaySchedule = schedule[day];

  if (!todaySchedule) {
    return false; // Fermé
  }

  // Vérifier si l'heure actuelle est dans les plages horaires
  return todaySchedule.some(
    (period) => currentMinutes >= period.start && currentMinutes <= period.end
  );
};

// Update heure / status
const updateStatus = () => {
  isOpen.value = checkIfOpen();
  currentTime.value = new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Hooks
onMounted(() => {
  updateStatus();
  interval = setInterval(updateStatus, 60000); // Vérifier toutes les minutes
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>
