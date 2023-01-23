<script setup lang="ts">
import { ref, watch, reactive, computed } from "vue";

export interface VTextareaEmits {
    (event: "update:modelValue", value?: any): void;
}
export interface VTextareaProps {
    id?: string;
    raw?: boolean;
    modelValue?: any;
}

const emits = defineEmits<VTextareaEmits>();
const props = withDefaults(defineProps<VTextareaProps>(), {
    modelValue: "",
    id: undefined,
});
const value = ref(props.modelValue);

watch(value, () => {
    emits("update:modelValue", value.value);
});
watch(
    () => props.modelValue,
    () => {
        value.value = props.modelValue;
    }
);

const classes = computed(() => {
    if (props.raw) return [];

    return ["textarea"];
});
</script>

<template>
    <textarea
        :id="`${props.id}_textarea`"
        :name="`${props.id}_textarea`"
        v-model="value"
        rows="4"
        class="form-input"
        v-bind="$attrs"
    ></textarea>
</template>
