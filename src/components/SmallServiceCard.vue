<template>
  <div class="bg-gray-50 dark:bg-gray-900 overflow-hidden">
    <div class="max-h-[480px] rounded-xl overflow-hidden">
      <img
        :src="props.image"
        class="w-full h-full rounded-xl overflow-hidden object-cover hover:scale-110 transition-transform duration-500"
      />
    </div>

    <div class="py-6">
      <h4 class="text-4xl font-bold mb-2 text-black dark:text-white">
        {{ props.title }}
      </h4>

      <p class="pt-2 text-m text-black dark:text-white">
        {{ props.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
</script>
