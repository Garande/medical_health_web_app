<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";

export interface VCheckboxEmits {
    (e: "update:modelValue", value: string | number | boolean): void;
}

export interface VCheckboxProps {
    raw?: boolean;
    id: string;
    label: string;
    trueValue?: string | number | boolean;
    falseValue?: string | number | boolean;
    modelValue?: any;
}

const emits = defineEmits<VCheckboxEmits>();
const props = withDefaults(defineProps<VCheckboxProps>(), {
    id: undefined,
    label: undefined,
    trueValue: true,
    falseValue: false,
    modelValue: false,
});

const $value = ref(props.modelValue as any);

watch($value, () => {
    emits("update:modelValue", $value.value);
});

watch(
    () => props.modelValue,
    () => {
        $value.value = props.modelValue;
    }
);
</script>

<template>
    <div class="flex items-center">
        <input
            type="checkbox"
            v-model="$value"
            v-bind="$attrs"
            :true-value="props.trueValue"
            :false-value="props.falseValue"
            class="w-4 h-4 text-green-600 bg-gray-100 rounded border-gray-300 focus:ring-green-500 focus:ring-2 active:ring-green-500 checked:ring-green-500 checked:text-green-600"
            :id="`${props.id}_checkbox`"
        />

        <span>{{ " " }}</span>

        <label
            :for="`${props.id}_checkbox`"
            class="ml-2 text-sm font-medium text-slate-600"
            ><slot>{{ props.label }}</slot></label
        >
    </div>
</template>
