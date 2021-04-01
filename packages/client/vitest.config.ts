import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        setupFiles: ['./test/config/setupTests.ts'],
        globals: true,
        environment: 'jsdom',
    },
})
