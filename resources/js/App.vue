<script setup lang="js"></script>

<template>
    <div>
        <Suspense>
            <RouterView v-slot="{ Component }">
                <Transition name="fade-slow" mode="out-in">
                    <component :is="Component" />
                </Transition>
            </RouterView>
        </Suspense>
    </div>
</template>
