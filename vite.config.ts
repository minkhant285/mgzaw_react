import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: 'node_modules/vpaid-flash-client/bin/VPAIDFlash.swf',
                    dest: 'assets',
                },
            ],
        }),
    ],
})
