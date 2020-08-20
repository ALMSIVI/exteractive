const MongoClient = require('mongodb').MongoClient
const NodeEnvironment = require('jest-environment-node')

module.exports = class MongoEnvironemnt extends NodeEnvironment {
    async setup() {
        if (!this.global.client) {
            this.global.client = await MongoClient.connect(process.env.DB_URI)
            this.global.db = await this.global.client.db('exteractive')
            await super.setup()
        }
    }

    async teardown() {
        await this.global.client.close()
        await super.teardown()
    }
}