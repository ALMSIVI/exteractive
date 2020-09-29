const MongoClient = require('mongodb').MongoClient
const NodeEnvironment = require('jest-environment-node')

module.exports = class MongoEnvironemnt extends NodeEnvironment {
    async setup() {
        if (!this.global.client) {
            this.global.client = await MongoClient.connect(process.env.TEST_DB_URI, { useUnifiedTopology: true })
            this.global.db = await this.global.client.db('test')
            await super.setup()
        }
    }

    async teardown() {
        if (this.global.client) {
            await this.global.client.close()
        }
        await super.teardown()
    }
}
