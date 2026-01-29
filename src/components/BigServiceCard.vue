<template>
  <div
    :class="props.color"
    class="rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
  >
    <div
      v-if="props.imagePos === 'left'"
      class="w-full md:w-1/2 flex items-center justify-center"
    >
      <img :src="props.image" class="max-w-full h-auto" />
    </div>

    <div class="w-full md:w-1/2 text-white">
      <h3 class="text-3xl md:text-4xl font-bold mb-4">
        {{ props.title }}
      </h3>
      <p class="text-lg mb-6 opacity-90">
        {{ props.description }}
      </p>
    </div>

    <div
      v-if="props.imagePos === 'right'"
      class="w-full md:w-1/2 flex items-center justify-center"
    >
      <img :src="props.image" class="max-w-full h-auto" />
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
  imagePos: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});
</script>
