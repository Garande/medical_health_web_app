import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";

export default defineConfig({
    build: {
        rollupOptions: {},
    },
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    includeAbsolute: false,
                },
            },
        }),
        /**
         * vite-plugin-pages plugin generate routes based on file system
         */
        Pages({
            dirs: "resources/js/pages",
        }),
    ],
});
