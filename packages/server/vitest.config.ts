import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: './test/config/vitest-environment-mongo.ts',
        globalSetup: './test/config/setup.ts',
        setupFiles: './test/config/setupData.ts',
    }
})