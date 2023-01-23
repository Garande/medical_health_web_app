<script setup lang="ts">
import HeaderView from "./HeaderView.vue";
</script>
<template>
    <div
        class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
        <!-- Header -->
        <header-view />
        <!--  -->
        <main>
            <div class="relative h-full p-0 main-content min-h-screen">
                <div class="page-content-wrapper h-full">
                    <div class="page-content h-full lg:px-10 md:px-8 sm:px-5">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.main-content {
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
}

.main-content .page-content-wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

.main-content .page-content-wrapper .page-content {
    width: 100%;
    /* background: red; */
    padding-top: calc(70px + 12px);
    /* padding:  40px 0 40px; */
}
</style>
