<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="space-y-8 mb-20">
        <BigServiceCard
          v-for="service in bigServices"
          :key="service.id"
          :title="service.title"
          :description="service.description"
          :image="service.image"
          :imagePos="service.imagePos"
          :color="service.color"
        />
      </div>
      <div
        class="grid grid-cols-1 gap-5 md:grid-cols-none md:grid-flow-col md:auto-cols-fr md:gap-6"
      >
        <SmallServiceCard
          v-for="service in smallServices"
          :key="service.id"
          :title="service.title"
          :description="service.description"
          :image="service.image"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import BigServiceCard from "../components/BigServiceCard.vue";
import SmallServiceCard from "../components/SmallServiceCard.vue";
import services from "../data/services.json";

const bigServices = services.mainServices;
const smallServices = services.secondaryServices;
</script>
