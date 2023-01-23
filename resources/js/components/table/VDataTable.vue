<script lang="ts">
import "simple-datatables/src/style.css";
</script>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
//@ts-ignore
import VCard from "../card/VCard.vue";
export type TableField = {
    label: string;
    thClass?: string;
    id: string;
    tdClass?: string;
    isCheckBox?: boolean;
    searchable?: boolean;
};

interface CustomDataTableProps {
    data: any[];
    fields: TableField[];
}

const props = withDefaults(defineProps<CustomDataTableProps>(), {
    data: undefined,
    fields: undefined,
});

const pages = [5, 10, 20, 25, 50, 100, 200, 500];

const perPage = ref<number>(25);
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);
const search = ref<string>("");

const tableData = ref<any[]>([]);

const sortedItems = ref<any[]>([]);

const filterData = () => {
    let fiteredData: any[] = [];
    if (search.value.length > 0) {
        try {
            fiteredData = props.data.filter((val) => {
                let state = false;
                props.fields.forEach((field) => {
                    if (
                        field.searchable &&
                        val[field.id] &&
                        (val[field.id].toLowerCase() ==
                            search.value.toLowerCase() ||
                            val[field.id]
                                .toLowerCase()
                                .includes(search.value.toLowerCase()))
                    ) {
                        state = true;
                        return;
                    }
                });
                return state;
            });
        } catch (error) {
            console.error(error);
        }
    } else {
        fiteredData = props.data;
    }

    let updateData = fiteredData.reduce((r: any, e: any, i: number) => {
        try {
            let length = 0;
            if (r != null && r != {} && Object.values(r).length > 0)
                length = Object.values(r).length - 1;
            let group = `${length}`;
            if (r[group] != undefined && r[group] != null) {
                let newGroup = `${length + 1}`;
                if (r[group].children.length < perPage.value) {
                    r[group].children.push(e);
                } else if (r[newGroup] != undefined && r[newGroup] != null) {
                    r[newGroup].children.push(e);
                } else {
                    r[newGroup] = { group: newGroup, children: [e] };
                }
            } else {
                r[group] = { group, children: [e] };
            }
            return r;
        } catch (error) {
            return sortedItems.value;
        }
    }, {});

    let results: any[] = Object.values(updateData);
    totalPages.value = results.length;
    sortedItems.value = results;
    tableData.value =
        results[currentPage.value - 1] != undefined
            ? results[currentPage.value - 1].children
            : [];
    //
    //
};

watch([perPage, currentPage, search], (prev, curr) => {
    filterData();
});

watch(
    () => props.data,
    (curr, prev) => {
        filterData();
    },
    {
        deep: true,
    }
);

onMounted(() => {
    filterData();
});
</script>

<template>
    <v-card>
        <div
            class="dataTable-wrapper dataTable-loading dataTable-empty no-footer sortable searchable fixed-columns br-section-wrapper"
        >
            <!--  -->
            <div class="dataTable-top">
                <div class="dataTable-dropdown">
                    <select
                        v-model="perPage"
                        class="page-selector form-input py-3 bg-transparent block h-9"
                    >
                        <option value="" disabled>Entries per page</option>
                        <option
                            v-for="item in pages"
                            :value="item"
                            :key="`item_${item}`"
                        >
                            {{ item }}
                        </option>
                    </select>
                </div>

                <div class="dataTable-search">
                    <input
                        type="text"
                        class="form-input"
                        placeholder="Search..."
                        v-model="search"
                    />
                </div>
            </div>
            <!--  -->
            <div class="dataTable-container table-wrap">
                <table class="dataTable-table table display responsive nowrap">
                    <slot>
                        <thead>
                            <tr>
                                <th
                                    v-for="item in props.fields"
                                    :key="`kt_${item.id}`"
                                    :class="item.thClass"
                                    scope="col"
                                    data-sortable="false"
                                >
                                    {{ item.label }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(row, index) in tableData"
                                :key="`tr_${index}`"
                            >
                                <td
                                    v-for="(field, fIndex) in props.fields"
                                    :key="`field_${index}_${fIndex}`"
                                    :class="field.tdClass"
                                >
                                    <slot
                                        :name="`cell(${field.id})`"
                                        :row="row"
                                        :index="index"
                                    >
                                        {{ row[field.id] }}
                                    </slot>
                                </td>

                                <!-- <td>
              </td> -->
                            </tr>
                        </tbody>
                    </slot>
                </table>
            </div>
            <!--  -->
            <div class="dataTable-bottom">
                <div class="dataTable-info text-sm text-light">
                    Showing
                    {{ currentPage == 1 ? 1 : (currentPage - 1) * perPage + 1 }}
                    to
                    {{
                        currentPage * perPage >= props.data.length
                            ? props.data.length
                            : currentPage * perPage
                    }}
                    of {{ props.data.length }} entries
                </div>

                <nav class="dataTable-pagination">
                    <ul class="dataTable-pagination-list">
                        <li
                            v-if="currentPage != 1"
                            class="pager"
                            @click="currentPage--"
                        >
                            <a href="#">‹</a>
                        </li>

                        <!--  -->
                        <!--  -->
                        <template v-if="totalPages > 1 && tableData != null">
                            <template v-if="currentPage - 3 >= 0">
                                <li :key="`it_${1}`" @click="currentPage = 1">
                                    <a href="#">{{ 1 }}</a>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                        "
                                    >
                                        <span>...</span>
                                    </a>
                                </li>
                            </template>
                            <li
                                :class="[
                                    currentPage - 1 == currentPage && 'active',
                                ]"
                                v-else-if="currentPage > 1"
                                @click="currentPage = currentPage - 1"
                            >
                                <a href="#">
                                    {{ currentPage - 1 }}
                                </a>
                            </li>
                            <li class="active" v-if="currentPage < totalPages">
                                <a href="#">
                                    {{ currentPage }}
                                </a>
                            </li>
                            <!--  -->
                            <template v-if="currentPage + 3 < totalPages">
                                <li>
                                    <a href="#">
                                        <span>...</span>
                                    </a>
                                </li>
                                <!--  -->
                                <li
                                    :class="[
                                        totalPages == currentPage && 'active',
                                    ]"
                                    @click="currentPage = totalPages"
                                >
                                    <a href="#">
                                        {{ totalPages }}
                                    </a>
                                </li>
                                <li @click="currentPage++">
                                    <a href="#">›</a>
                                </li>
                            </template>
                            <template
                                v-else-if="totalPages - currentPage > 1"
                                v-for="item in totalPages - currentPage"
                                :key="`item_${item}`"
                            >
                                <li
                                    :class="[
                                        currentPage + item == currentPage &&
                                            'active',
                                    ]"
                                    @click="currentPage = currentPage + item"
                                >
                                    <a href="#">
                                        {{ currentPage + item }}
                                    </a>
                                </li>
                            </template>

                            <li
                                v-else
                                :class="[totalPages == currentPage && 'active']"
                                @click="currentPage = totalPages"
                            >
                                <a href="#">
                                    {{ totalPages }}
                                </a>
                            </li>
                        </template>

                        <!--  -->
                        <!--  -->
                    </ul>
                </nav>
            </div>
        </div>
    </v-card>
</template>

<style scoped>
.dataTable-container::-webkit-scrollbar {
    height: 8px !important;
}
.dataTable-container::-webkit-scrollbar-thumb {
    border-radius: 10px !important;
    background: rgb(0 0 0 / 20%) !important;
}

.dataTable-container .dataTable-table {
    /* border: 1px solid var(--border-color); */
    border-collapse: collapse;
    border-radius: 0.75rem;
    border-bottom: none;
}

.dataTable-container .dataTable-table thead {
    background: #eff2f7;
}

.dataTable-container .dataTable-table th {
    /* padding: 16px 20px; */
    border: 1px solid var(--border-color);
    /* background: var(--border-color); */
}

.dataTable-container .dataTable-table td {
    vertical-align: middle !important;
    border-bottom: 1px solid var(--border-color);
}

.dataTable-container .dataTable-table tbody tr:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.03);
}

.dataTable-container .dataTable-table tbody tr:hover {
    background: #eff2f7;
}

.dataTable-pagination li a {
    color: var(--light-text);
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    @apply flex items-center justify-center rounded-full p-0 w-9 h-9;
}

.dataTable-pagination li a:hover {
    background: #eff2f7;
    /* border-color: #ced4da; */
    color: var(--primary);
    text-decoration: none;
}

.dataTable-pagination li.active a {
    background: var(--primary);
    color: #fff;
}
</style>
