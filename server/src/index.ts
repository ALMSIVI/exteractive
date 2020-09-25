import { config } from 'dotenv'
import { MongoClient, Db } from 'mongodb'
import app from './app'
import StoriesDAO from './dao/storiesDAO'
import pino from 'pino'
;(async () => {
    config()
    const port = process.env.PORT || 3001
    const logger = pino()

    try {
        const client: MongoClient = await MongoClient.connect(process.env.DB_URI, { useUnifiedTopology: true })
        const db: Db = client.db('exteractive')

        StoriesDAO.inject(db)

        app.listen(port, () => logger.info(`Listening on port ${port}...`))
    } catch (e) {
        console.error(e)
    }
})()
