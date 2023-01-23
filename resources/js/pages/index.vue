<script setup lang="ts">
import AppLayoutView from "../components/AppLayoutView.vue";
import VBreadcrumb from "../components/breadcrumb/VBreadcrumb.vue";
import VButton from "../components/button/V-Button.vue";
import VDataTable, { TableField } from "../components/table/VDataTable.vue";
import { onMounted } from "vue";
import { usePatients } from "../store/patients";
import useNotyf from "../composable/useNotyf";

const store = usePatients();
const notif = useNotyf();

const tableFields: TableField[] = [
    { id: "id", label: "SN", tdClass: "text-sm" },
    {
        id: "name",
        label: "Patient's name",
        searchable: true,
        tdClass: "text-sm",
    },
    {
        id: "gender",
        label: "Gender",
        searchable: true,
        tdClass: "text-sm",
    },
    {
        id: "dateOfBirth",
        label: "Date of Birth",
        searchable: true,
        tdClass: "text-sm",
    },
    {
        id: "weight",
        label: "Weight",
        tdClass: "text-right text-sm",
        thClass: "text-right",
    },
    { id: "action", label: "Action" },
];

onMounted(() => {
    store.fetchPatients();
});

const deleteItem = async (row: any) => {
    try {
        await store.deletePatient(row);
        notif.success("Patient Record deleted successfully");
    } catch (e: any) {
        notif.error(e.toString());
    }
};
</script>

<template>
    <app-layout-view>
        <v-breadcrumb title="Patients">
            <template #actions>
                <v-button color="primary" :to="{ name: 'add-patient' }"
                    >Add Patient</v-button
                >
            </template>
        </v-breadcrumb>
        <!-- <slot></slot> -->
        <div class="flex flex-wrap w-full relative">
            <div class="flex-12 px-3 py-3.5">
                <VDataTable :data="store.patients || []" :fields="tableFields">
                    <!-- Fname -->
                    <template v-slot:cell(name)="{ row }">
                        <span>{{ row.firstName }} {{ row.lastName }}</span>
                    </template>
                    <!-- Actions -->
                    <template v-slot:cell(action)="{ row }">
                        <v-button
                            color="info"
                            class="mx-2"
                            :to="{ name: 'add-patient', query: { id: row.id } }"
                            >Edit</v-button
                        >
                        <v-button
                            color="danger"
                            class="mx-2"
                            @click="() => deleteItem(row)"
                            >Delete</v-button
                        >
                    </template>
                </VDataTable>
            </div>
        </div>

        <!--  -->
    </app-layout-view>
</template>
