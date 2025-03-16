import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    // server: {
    //     host: true,  // Ini memungkinkan akses dari HP
    //     port: 5173,
    //   },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
        VitePWA({
            devOptions: {
                enabled: false,
            },
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            includeAssets: ['favicon.ico', 'robots.txt'],
            manifest: {
                name: 'Kiki\'s Attendance Location',
                short_name: 'Kiki\'s Attendance',
                description: 'Kiki\'s Attendance Location Office App',
                theme_color: '#4f46e5',
                background_color: '#ffffff',
                display: 'standalone',
                orientation: 'portrait',
                start_url: '/',
                scope: '/',
                icons: [
                    {
                        src: '/logo-pwa-64x64.png',
                        sizes: '64x51',
                        type: 'image/png'
                    },
                    {
                        src: '/logo-pwa-192x192.png',
                        sizes: '117x94',
                        type: 'image/png'
                    },
                    {
                        src: '/logo-pwa-192x192.png',
                        sizes: '117x94',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: '/logo-maskable-icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ],
            },
            workbox: {
                maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MiB
                runtimeCaching: [
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg|js|css)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'asset-cache',
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
                            },
                        },
                    },
                ],
            },
        }),
    ],
});
