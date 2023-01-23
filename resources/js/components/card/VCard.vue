<script setup lang="ts">
import { ref } from "vue";
import VLoader from "../loaders/VLoader.vue";

export interface VCardProps {
    loading?: boolean;
}
const props = withDefaults(defineProps<VCardProps>(), {
    loading: undefined,
});
</script>

<template>
    <div class="card rounded-md relative">
        <div class="card-inner">
            <slot></slot>
        </div>
        <v-loader v-if="props.loading" />
    </div>
</template>

<style>
.card {
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: 0px 1px 3px 0px rgba(54, 74, 99, 0.05);
}

.card .card-inner {
    padding: 20px;
}

.card .card-title {
    color: var(--text-muted);
    font-weight: 500;
    font-weight: 15px;
}
</style>
