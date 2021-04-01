import { MongoClient } from 'mongodb'
import type { Environment } from 'vitest'
import { builtinEnvironments } from 'vitest/environments'

const { node } = builtinEnvironments

export default <Environment>{
    name: 'mongo',
    async setup() {
        if (!global.client) {
            global.client = await MongoClient.connect(process.env.TEST_DB_URI, { useUnifiedTopology: true })
            global.db = await global.client.db('test')
        }
        const { teardown: nodeTeardown } = await node.setup(global, {})

        return {
            async teardown() {
                if (global.client) {
                    await global.client.close()
                }
                await nodeTeardown(global)
            },
        }
    },
}
