<script lang="ts">
import "@vueform/multiselect/themes/default.scss";
</script>

<script setup lang="ts">
import { ref, watch } from "vue";
// import { uploadMediaFile } from "/@src/utils/fileUtils";
import useNotyf from "../../composable/useNotyf";
import { isEmpty } from "../../utils";
import VButton from "../button/V-Button.vue";
// @ts-ignore
import VCheckbox from "./VCheckbox.vue";
// @ts-ignore
import VInput from "./VInput.vue";
// @ts-ignore
import VRadio from "./VRadio.vue";
// @ts-ignore
import VTextarea from "./VTextarea.vue";

export interface FormField {
    id: string;
    label: string;
    type:
        | "text"
        | "date"
        | "image"
        | "file"
        | "number"
        | "select"
        | "password"
        | "textarea"
        | "editor"
        | "checkbox"
        | "label"
        | "tel"
        | "radio";
    options?: any[];
    group?: { value: string; text: string }[];
    disabled?: boolean;
    class?: string;
    placeholder?: string;
    isRequired?: boolean;
    isConditional?: boolean;
    conditionId?: any;
    condition?: (form: any) => boolean;
}

export interface VFormBuilderProps {
    fields: FormField[];
    isButtonFullWidth?: boolean;
    data?: any;
}

const props = withDefaults(defineProps<VFormBuilderProps>(), {
    fields: undefined,
    data: undefined,
});

const emits = defineEmits<{
    (e: "submit", data: any): Promise<void>;
    (e: "set-loading", value: boolean): void;
}>();

const notif = useNotyf();
// const CKEditor = CKE.component;
// const editorData = ref(`<h2>Your HTML Content</h2>`);
// const config = {
//     fontFamily: {
//         options: ['"Poppins", sans-serif', '"Poppins", sans-serif'],
//     },
// };

const formFiles = ref<any>({});

const form = ref<any>({});

watch(
    () => props.data,
    (prev, cur) => {
        if (props.data != undefined && props.data != null) {
            form.value = props.data;
        }
    }
);

const handleCheckbox = (checkId: any, itemId: any) => {
    if (form.value[itemId] != undefined && form.value[itemId] != null) {
        const index = form.value[itemId].indexOf(checkId);
        if (index > -1) {
            form.value[itemId].splice(index, 1);
        } else {
            form.value[itemId].push(checkId);
        }
    } else {
        const data = { ...form.value };
        data[itemId] = [checkId];
        form.value = data;
    }
};

const handleRadioCheck = (checkId: any, itemId: any) => {
    form.value[itemId] = checkId;
};

const isChecked = (id: string, checkId: any) => {
    return (
        form.value[id] != undefined &&
        form.value[id] != null &&
        form.value[id].includes(checkId)
    );
};

const isRadioChecked = (id: string, checkId: any) => {
    return (
        form.value[id] != undefined &&
        form.value[id] != null &&
        form.value[id] == checkId
    );
};

const handleFileSelection = async (e: any, fieldId: string) => {
    const file = e.target.files[0];
    formFiles.value[fieldId] = file;
};

const handleFormSubmission = async (e: any) => {
    try {
        emits("set-loading", true);

        props.fields.forEach((field) => {
            if (field.isRequired && isEmpty(form.value[field.id])) {
                throw `${field.label} is required!`;
            }
        });
        //
        await emits("submit", form.value);
        emits("set-loading", false);
    } catch (error: any) {
        notif.error(error.message || error.toString());
        emits("set-loading", false);
    }
};
</script>

<template>
    <div class="relative w-full">
        <form @submit.prevent="handleFormSubmission" class="relative">
            <div class="flex flex-wrap w-full">
                <template
                    v-for="(item, idx) in props.fields"
                    :key="`item_${idx}`"
                >
                    <label
                        v-if="
                            item.type == 'label' &&
                            ((item.isConditional &&
                                item.condition != undefined &&
                                item.condition(form)) ||
                                item.isConditional == undefined ||
                                item.isConditional == false)
                        "
                        :class="item.class"
                        >{{ item.label }}</label
                    >
                    <template v-else>
                        <label
                            v-if="
                                (item.isConditional &&
                                    item.condition != undefined &&
                                    item.condition(form)) ||
                                item.isConditional == undefined ||
                                item.isConditional == false
                            "
                            :for="item.id"
                            class="mt-3"
                            :class="item.class"
                        >
                            <span
                                v-if="
                                    (item.type == 'checkbox' ||
                                        item.type == 'radio') &&
                                    (item.group == undefined ||
                                        item.group == null ||
                                        item.group.length <= 0)
                                "
                                >{{ "" }}</span
                            >
                            <span
                                class="block text-sm font-medium text-slate-700"
                                v-else
                                >{{ item.label }}
                                <small
                                    v-if="item.isRequired"
                                    class="text-red-500"
                                    >(Required)</small
                                ></span
                            >
                            <VTextarea
                                v-if="item.type == 'textarea'"
                                v-model="form[item.id]"
                                :placeholder="item.placeholder || item.label"
                                :disabled="item.disabled"
                            ></VTextarea>

                            <!-- <CKEditor
                            v-else-if="item.type == 'editor'"
                            v-model="form[item.id]"
                            :editor="ClassicEditor"
                            :config="config"
                        ></CKEditor> -->
                            <input
                                v-else-if="
                                    item.type == 'file' || item.type == 'image'
                                "
                                type="file"
                                class="form-input"
                                :accept="
                                    item.type == 'image' ? `image/*` : `*/*`
                                "
                                :placeholder="item.placeholder || item.label"
                                :disabled="item.disabled"
                                @change="
                                    ($event) =>
                                        handleFileSelection($event, item.id)
                                "
                            />
                            <Multiselect
                                v-else-if="item.type == 'select'"
                                v-model="form[item.id]"
                                :options="item.options"
                                value-prop="id"
                                label="label"
                                :searchable="true"
                                :placeholder="item.placeholder || item.label"
                                :disabled="item.disabled"
                            />
                            <!-- Checkbox -->
                            <VCheckbox
                                v-else-if="
                                    item.type == 'checkbox' &&
                                    (item.group === undefined ||
                                        item.group.length <= 0)
                                "
                                v-model="form[item.id]"
                                :label="item.label"
                                :id="`${item.id}`"
                            />

                            <template
                                v-else-if="
                                    item.type == 'checkbox' &&
                                    item.group !== undefined &&
                                    item.group.length > 0
                                "
                            >
                                <VCheckbox
                                    v-for="(rItem, rIdx) in item.group"
                                    :key="`check_${rIdx}`"
                                    :value="`${rItem.value}`"
                                    :label="rItem.text"
                                    :id="`${rItem.value}`"
                                    :checked="isChecked(item.id, rItem.value)"
                                    @click="
                                        () =>
                                            handleCheckbox(rItem.value, item.id)
                                    "
                                />
                            </template>

                            <!--  -->
                            <!-- Radio -->

                            <VRadio
                                v-else-if="
                                    item.type == 'radio' &&
                                    (item.group === undefined ||
                                        item.group.length <= 0)
                                "
                                v-model="form[item.id]"
                                :label="item.label"
                                :name="item.id"
                                :value="item.id"
                                :id="`${item.id}`"
                            />

                            <template
                                v-else-if="
                                    item.type == 'radio' &&
                                    item.group !== undefined &&
                                    item.group.length > 0
                                "
                            >
                                <VRadio
                                    v-for="(rItem, rIdx) in item.group"
                                    :key="`radio_${rIdx}`"
                                    v-model="form[item.id]"
                                    :label="rItem.text"
                                    :name="rItem.value"
                                    :value="rItem.value"
                                    :checked="
                                        isRadioChecked(item.id, rItem.value)
                                    "
                                    :id="`${rItem.value}`"
                                    @click="
                                        () =>
                                            handleRadioCheck(
                                                rItem.value,
                                                item.id
                                            )
                                    "
                                />
                            </template>

                            <!--  -->
                            <VInput
                                v-else
                                :type="item.type"
                                v-model="form[item.id]"
                                :placeholder="item.placeholder || item.label"
                                :disabled="item.disabled"
                            />
                        </label>
                    </template>
                    <!--  -->
                </template>
            </div>

            <!--  -->
            <div
                class="lg:flex-12 md:flex-12 sm:flex-12 xs:flex-12 px-3 py-0.5"
            >
                <VButton
                    color="primary"
                    type="submit"
                    class="mt-3"
                    :fullwidth="isButtonFullWidth"
                    >Save Changes</VButton
                >
            </div>
            <!--  -->
        </form>
    </div>
</template>
