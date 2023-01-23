<script setup lang="ts">
import { watch, ref, reactive, computed } from "vue";

export interface VInputEmits {
    (event: "update:modelValue", value?: any): void;
}

export interface VInputProps {
    id?: string;
    raw?: boolean;
    modelValue?: any;
    trueValue?: boolean;
    falseValue?: boolean;
}

const emits = defineEmits<VInputEmits>();
const props = withDefaults(defineProps<VInputProps>(), {
    id: undefined,
    modelValue: "",
    trueValue: true,
    falseValue: false,
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
</script>

<template>
    <input
        :id="`${props.id}_input`"
        v-model="value"
        class="form-input"
        :name="`${props.id}_input`"
        :true-value="props.trueValue"
        :false-value="props.falseValue"
        v-bind="$attrs"
        style="height: 38px; background: #fff"
    />
</template>
