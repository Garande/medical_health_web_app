<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";

export interface VRadioEmits {
    (e: "update:modelValue", value: string | number | boolean): void;
}

export interface VRadioProps {
    id?: string;
    label?: string;
    name?: string;
    value: any;
    modelValue?: any;
}

const emits = defineEmits<VRadioEmits>();
const props = withDefaults(defineProps<VRadioProps>(), {
    id: undefined,
    label: undefined,
    name: undefined,
    modelValue: undefined,
});

const value = ref(props.modelValue as any);

watch(value, () => {
    emits("update:modelValue", value.value);
});

watch(
    () => props.modelValue,
    () => {
        value.value = props.modelValue;
    }
);
</script>

<template>
    <div class="flex items-center">
        <input
            type="radio"
            v-model="value"
            v-bind="$attrs"
            class="w-4 h-4 text-green-600 bg-gray-100 rounded border-gray-300 focus:ring-green-500 focus:ring-2 active:ring-green-500 checked:ring-green-500 checked:text-green-600"
            :id="`${props.id}_radio`"
        />

        <span>{{ " " }}</span>

        <label
            :for="`${props.id}_radio`"
            class="ml-2 text-sm font-medium text-slate-600"
            ><slot>{{ props.label }}</slot></label
        >
    </div>
</template>
