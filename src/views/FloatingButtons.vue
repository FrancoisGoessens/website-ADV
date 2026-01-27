<template>
  <div class="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
    <button
      @click="scrollToTop"
      class="group p-3 backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 border border-white/10 rounded-full shadow-lg shadow-black/10 hover:shadow-xl hover:scale-110 transition-all duration-300"
      aria-label="Scroll to top"
    >
      <ChevronUp
        class="w-6 h-6 text-gray-900 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors"
      />
    </button>

    <button
      @click="scrollToBottom"
      class="group p-3 backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 border border-white/10 rounded-full shadow-lg shadow-black/10 hover:shadow-xl hover:scale-110 transition-all duration-300"
      aria-label="Scroll to bottom"
    >
      <ChevronDown
        class="w-6 h-6 text-gray-900 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors"
      />
    </button>

    <button
      @click="toggleDarkMode"
      class="group p-3 backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 border border-white/10 rounded-full shadow-lg shadow-black/10 hover:shadow-xl hover:scale-110 transition-all duration-300"
      aria-label="Toggle dark mode"
    >
      <Sun
        v-if="isDark"
        class="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors"
      />
      <Moon
        v-else
        class="w-6 h-6 text-gray-900 group-hover:text-indigo-600 transition-colors"
      />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { ChevronUp, ChevronDown, Sun, Moon } from "lucide-vue-next";

const showScrollTop = ref(false);
const isDark = ref(false);

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value;

  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

const initDarkMode = () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  isDark.value = savedTheme === "dark" || (!savedTheme && prefersDark);

  if (isDark.value) {
    document.documentElement.classList.add("dark");
  }
};

onMounted(() => {
  initDarkMode();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
