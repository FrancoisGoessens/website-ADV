<template>
  <div>
    <NavBar />
    <FloatingButtons />
    <HeroSection />
    <ServicesSection />
  </div>
  <div class="h-[250px] bg-gray-50 dark:bg-gray-900"></div>
</template>

<script setup lang="ts">
import FloatingButtons from "./views/FloatingButtons.vue";
import HeroSection from "./views/HeroSection.vue";
import NavBar from "./views/NavBar.vue";
import ServicesSection from "./views/ServicesSection.vue";
</script>
