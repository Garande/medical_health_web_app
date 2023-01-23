<script setup lang="ts">
import { ref } from "vue";
interface VBreadcrumbProps {
  title: string;
}
const props = withDefaults(defineProps<VBreadcrumbProps>(), {
  title: "Welcome",
});
</script>

<template>
  <div class="flex w-full relative">
    <div class="flex-12 px-3 justify-between items-center flex flex-row">
      <h4 class="text-2xl font-semibold">{{ props.title }}</h4>
      <div>
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>
