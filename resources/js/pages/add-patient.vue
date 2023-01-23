<script setup lang="ts">
import { ref, onMounted } from "vue";
// @ts-ignore
import VCard from "../components/card/VCard.vue";
// @ts-ignore
import VInput from "../components/forms/VInput.vue";
import VButton from "../components/button/V-Button.vue";
// @ts-ignore
import VFormBuilder, { FormField } from "../components/forms/VFormBuilder.vue";
import AppLayoutView from "../components/AppLayoutView.vue";
import VBreadcrumb from "../components/breadcrumb/VBreadcrumb.vue";
import { PatientData, usePatients } from "../store/patients";
import useNotyf from "../composable/useNotyf";
import { isEmpty } from "../utils";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const store = usePatients();
const notif = useNotyf();

const loading = ref<boolean>(false);

const patient = ref<PatientData | {}>({});

const fields = ref<FormField[]>([
    {
        id: "title",
        label: "Personal Information",
        type: "label",
        class: "lg:flex-12 md:flex-12 sm:flex-12 xs:flex-12 px-3 py-0.5 mb-0",
    },
    {
        id: "firstName",
        label: "First name",
        placeholder: "Enter first name",
        type: "text",
        class: "lg:flex-6 md:flex-6 sm:flex-12 xs:flex-12 px-3 py-0.5 mt-0",
        isRequired: true,
    },

    {
        id: "lastName",
        label: "Last name",
        placeholder: "Enter last name",
        type: "text",
        class: "lg:flex-6 md:flex-6 sm:flex-12 xs:flex-12 px-3 py-0.5 mt-0",
        isRequired: true,
    },
    {
        id: "dateOfBirth",
        label: "Date of Birth",
        placeholder: "Select Date of Birth",
        type: "date",
        class: "lg:flex-6 md:flex-6 sm:flex-12 xs:flex-12 px-3 py-0.5",
        isRequired: true,
    },
    {
        id: "gender",
        label: "Gender",
        placeholder: "Select gender",
        type: "select",
        class: "lg:flex-6 md:flex-6 sm:flex-12 xs:flex-12 px-3 py-0.5",
        isRequired: false,
        options: [
            { id: "MALE", label: "Male" },
            { id: "FEMALE", label: "Female" },
        ],
    },
    {
        id: "primaryCarePhysician",
        label: "Primary Care Physician",
        type: "label",
        class: "lg:flex-12 md:flex-12 sm:flex-12 xs:flex-12 px-3 py-0.5 mt-3 mb-0",
        isConditional: true,
        condition: (form: any) =>
            !isEmpty(form["firstName"]) &&
            !isEmpty(form["lastName"]) &&
            !isEmpty(form["dateOfBirth"]) &&
            !isEmpty(form["gender"]),
    },
    {
        id: "primaryCarePhysicianFirstName",
        label: "Physician First name",
        placeholder: "Enter Physician First name",
        type: "text",
        class: "lg:flex-6 md:flex-6 sm:flex-12 xs:flex-12 px-3 py-0.5 mt-0",
        isRequired: true,
        //
        isConditional: true,
        condition: (form: any) =>
            !isEmpty(form["firstName"]) &&
            !isEmpty(form["lastName"]) &&
            !isEmpty(form["dateOfBirth"]) &&
            !isEmpty(form["gender"]),
    },
    {
        id: "primaryCarePhysicianLastName",
        label: "Physician Last name",
        placeholder: "Enter Physician Last name",
        type: "text",
        class: "lg:flex-6 md:flex-6 sm:flex-12 xs:flex-12 px-3 py-0.5 mt-0",
        isRequired: true,
        //
        isConditional: true,
        condition: (form: any) =>
            !isEmpty(form["firstName"]) &&
            !isEmpty(form["lastName"]) &&
            !isEmpty(form["dateOfBirth"]) &&
            !isEmpty(form["gender"]),
    },
    {
        id: "currentTherapist",
        label: "Current Therapist / Counselor",
        type: "label",
        class: "lg:flex-12 md:flex-12 sm:flex-12 xs:flex-12 px-3 py-0.5 mt-3 mb-0",
        //
        isConditional: true,
        condition: (form: any) =>
            !isEmpty(form["firstName"]) &&
            !isEmpty(form["lastName"]) &&
            !isEmpty(form["dateOfBirth"]) &&
            !isEmpty(form["gender"]),
    },
    {
        id: "currentTherapistFirstName",
        label: "Therapist First name",
        placeholder: "Enter Therapist First name",
        type: "text",
        class: "lg:flex-6 md:flex-6 sm:flex-12 xs:flex-12 px-3 py-0.5 mt-0",
        isRequired: true,
        //
        isConditional: true,
        condition: (form: any) =>
            !isEmpty(form["firstName"]) &&
            !isEmpty(form["lastName"]) &&
            !isEmpty(form["dateOfBirth"]) &&
            !isEmpty(form["gender"]),
    },
    {
        id: "currentTherapistLastName",
        label: "Therapist Last name",
        placeholder: "Enter Therapist Last name",
        type: "text",
        class: "lg:flex-6 md:flex-6 sm:flex-12 xs:flex-12 px-3 py-0.5 mt-0",
        isRequired: true,
        //
        isConditional: true,
        condition: (form: any) =>
            !isEmpty(form["firstName"]) &&
            !isEmpty(form["lastName"]) &&
            !isEmpty(form["dateOfBirth"]) &&
            !isEmpty(form["gender"]),
    },
    {
        id: "currentTherapistPhoneNumber",
        label: "Therapist Phone number",
        placeholder: "Enter Therapist Phone number",
        type: "tel",
        class: "lg:flex-12 md:flex-12 sm:flex-12 xs:flex-12 px-3 py-0.5",
        //
        isConditional: true,
        condition: (form: any) =>
            !isEmpty(form["firstName"]) &&
            !isEmpty(form["lastName"]) &&
            !isEmpty(form["dateOfBirth"]) &&
            !isEmpty(form["gender"]),
    },

    //
    {
        id: "illness",
        label: "Illness",
        type: "label",
        class: "lg:flex-12 md:flex-12 sm:flex-12 xs:flex-12 px-3 py-0.5 mt-3 mb-0",
        //
        isConditional: true,
        condition: (form: any) =>
            !isEmpty(form["firstName"]) &&
            !isEmpty(form["lastName"]) &&
            !isEmpty(form["dateOfBirth"]) &&
            !isEmpty(form["gender"]),
    },
    {
        id: "currentSymptoms",
        label: "What symptoms do you have?",
        type: "checkbox",
        class: "lg:flex-6 md:flex-6 sm:flex-12 xs:flex-12 px-3 py-0.5 mt-0",
        isRequired: false,
        group: [
            { value: "depressedMood", text: "Depressed mood" },
            { value: "excessiveWorry", text: "Excessive worry" },
            { value: "impulsivity", text: "Impulsivity" },
            {
                value: "sleepPatternDisturbance",
                text: "Sleep pattern disturbance",
            },
            { value: "avoidance", text: "Avoidance" },
            { value: "increasedLibido", text: "Increased libido" },
            { value: "concentration", text: "Concentration /Forgetfulness" },
            { value: "suspiciousness", text: "Suspiciousness" },
            { value: "excessiveEnergy", text: "Excessive energy" },
            { value: "hallucinations", text: "Hallucinations" },
            { value: "anxietyAttacks", text: "Anxiety attacks" },
        ],
        //
        isConditional: true,
        condition: (form: any) =>
            !isEmpty(form["firstName"]) &&
            !isEmpty(form["lastName"]) &&
            !isEmpty(form["dateOfBirth"]) &&
            !isEmpty(form["gender"]),
    },
    {
        id: "previousDeathFeelings",
        label: "Have you ever had feelings or thoughts that you didn't want to live?",

        type: "radio",
        class: "lg:flex-6 md:flex-6 sm:flex-12 xs:flex-12 px-3 py-0.5 mt-0",
        isRequired: false,
        group: [
            { value: "YES", text: "Yes" },
            { value: "NO", text: "No" },
        ],
        //
        isConditional: true,
        condition: (form: any) => !isEmpty(form["currentSymptoms"]),
    },
    {
        id: "currentDeathFeelings",
        label: "Do you currently feel that you don't want to live?",
        type: "radio",
        class: "lg:flex-12 md:flex-12 sm:flex-12 xs:flex-12 px-3 py-0.5 ",
        isRequired: false,
        group: [
            { value: "YES", text: "Yes" },
            { value: "NO", text: "No" },
        ],
        //
        isConditional: true,
        condition: (form: any) =>
            !isEmpty(form["previousDeathFeelings"]) &&
            form["previousDeathFeelings"] == "YES",
    },
    {
        id: "deathFeelingsFrequency",
        label: "How often do you have these thoughts?",
        placeholder: "How often do you have these thoughts?",
        type: "text",
        class: "lg:flex-6 md:flex-6 sm:flex-12 xs:flex-12 px-3 py-0.5",
        //
        isConditional: true,
        condition: (form: any) =>
            !isEmpty(form["currentDeathFeelings"]) &&
            form["currentDeathFeelings"] == "YES",
    },
    {
        id: "lastDeathFeelingsDate",
        label: "When was the last time you had thoughts of dying?",
        placeholder: "When was the last time you had thoughts of dying?",
        type: "date",
        class: "lg:flex-6 md:flex-6 sm:flex-12 xs:flex-12 px-3 py-0.5",
        //
        isConditional: true,
        condition: (form: any) => !isEmpty(form["deathFeelingsFrequency"]),
    },
    {
        id: "medicalHistory",
        label: "Medical History",
        type: "label",
        class: "lg:flex-12 md:flex-12 sm:flex-12 xs:flex-12 px-3 py-0.5 mt-3 mb-0",
        //
        isConditional: true,
        condition: (form: any) => !isEmpty(form["currentSymptoms"]),
    },
    {
        id: "weight",
        label: "Current Weight",
        placeholder: "Enter Current Weight (Kgs)",
        type: "number",
        class: "lg:flex-6 md:flex-6 sm:flex-12 xs:flex-12 px-3 py-0.5",
        //
        isConditional: true,
        condition: (form: any) => !isEmpty(form["currentSymptoms"]),
    },
    {
        id: "height",
        label: "Current Height",
        placeholder: "Enter Current Height (cm)",
        type: "number",
        class: "lg:flex-6 md:flex-6 sm:flex-12 xs:flex-12 px-3 py-0.5",
        //
        isConditional: true,
        condition: (form: any) => !isEmpty(form["currentSymptoms"]),
    },
    {
        id: "medicalProblems",
        label: "Current Medical problems",
        placeholder: "Enter Current Medical problems",
        type: "textarea",
        class: "lg:flex-12 md:flex-12 sm:flex-12 xs:flex-12 px-3 py-0.5",
        //
        isConditional: true,
        condition: (form: any) => !isEmpty(form["currentSymptoms"]),
    },
    {
        id: "pastMedicalProblems",
        label: "Past medical problems, nonpsychiatric hospitalization, or surgeries",
        placeholder:
            "Enter Past medical problems, nonpsychiatric hospitalization, or surgeries",
        type: "textarea",
        class: "lg:flex-12 md:flex-12 sm:flex-12 xs:flex-12 px-3 py-0.5",
        //
        isConditional: true,
        condition: (form: any) => !isEmpty(form["currentSymptoms"]),
    },
]);

onMounted(async () => {
    if (route.query.id != undefined && route.query.id != null) {
        const id = route.query.id as string;

        let SN = parseInt(id);
        const data = await store.fetchPatientById(SN);

        if (data != null) {
            patient.value = data;
        }
    }
});

const setLoading = (val: boolean) => {
    loading.value = val;
};

const handleSubmit = async (data: any) => {
    try {
        if (data.currentSymptoms != undefined && data.currentSymptoms != null) {
            data.currentSymptoms = JSON.stringify(data.currentSymptoms);
        }
        //
        await store.savePatient(data);
        notif.success("Patient saved successfully");
        router.push({ name: "index" });
    } catch (error: any) {
        //
        notif.error(error?.message || error.toString());
    }
};
</script>

<template>
    <app-layout-view>
        <v-breadcrumb title="Add Patient">
            <template #actions>
                <v-button color="primary" :to="{ name: 'index' }"
                    >View Patients</v-button
                >
            </template>
        </v-breadcrumb>
        <!-- <slot></slot> -->
        <div class="flex flex-wrap w-full relative">
            <div class="flex-12 px-3 py-3.5 w-full">
                <!--  -->
                <VCard :loading="loading">
                    <div class="flex flex-wrap w-full relative">
                        <div class="flex-12 py-3">
                            <h1 class="text-2xl font-medium">
                                Mental Health Intake Form
                            </h1>
                        </div>

                        <v-form-builder
                            :fields="fields"
                            :data="patient"
                            @set-loading="setLoading"
                            @submit="handleSubmit"
                        />
                    </div>
                </VCard>
            </div>
        </div>
    </app-layout-view>
</template>
