<script setup lang="ts">
import { ref } from "vue";

const menu = ref<any[]>([
    {
        id: "patients",
        label: "Patients",
        linkName: "index",
    },
    {
        id: "add-patient",
        label: "Add Patient",
        linkName: "add-patient",
    },
]);
</script>

<template>
    <!-- Header -->
    <div class="fixed header left-0 right-0 top-0 z-30">
        <div class="app-header">
            <div class="container h-full px-3">
                <div
                    class="flex h-full sm:justify-between lg:justify-between items-center"
                >
                    <!--  -->
                    <div>
                        <h1>Logo</h1>
                    </div>

                    <!--  -->
                    <div class="right-menu flex items-center gap-2 relative">
                        <template
                            v-for="(item, idx) in menu"
                            :key="`menu_${idx}`"
                        >
                            <RouterLink
                                :to="{
                                    name: item.linkName,
                                }"
                                class="menu-item"
                                >{{ item.label }}</RouterLink
                            >
                        </template>

                        <div class="avatar"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
    /* padding: 0 12px 0 12px; */
}
.app-header {
    height: 70px;
    box-shadow: var(--box-shadow);
    border-bottom: 1px solid var(--border-color);
    background: var(--card-bg);
    width: 100%;
    /* padding: 12px; */
}

.avatar {
    height: 40px;
    width: 40px;
    background: #f5f5f5;
    border-radius: 100%;
    border: 1px solid #e5e5e5;
}

.menu-item {
    position: relative;
    cursor: pointer;

    &::before {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 2px;
        width: 50%;
        -webkit-transform-origin: right center;
        -ms-transform-origin: right center;
        transform-origin: right center;
        height: 3px;
        border-radius: 50px;
        background: var(--primary);
        -webkit-transform: scale(0, 1);
        -ms-transform: scale(0, 1);
        transform: scale(0, 1);
        -webkit-transition: -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        transition: -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &.active {
        &::before {
            background: var(--primary);
        }

        // &::after {
        //   content: "";
        //   border-bottom: 2px solid var(--primary);
        //   border-radius: 3px;
        // }
    }

    &.active,
    &.is-active,
    &:hover {
        color: var(--primary);

        &::before {
            -webkit-transform-origin: left center;
            -ms-transform-origin: left center;
            transform-origin: left center;
            -webkit-transform: scale(1, 1);
            -ms-transform: scale(1, 1);
            transform: scale(1, 1);
        }
    }
}
</style>
