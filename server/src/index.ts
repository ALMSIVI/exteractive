import * as dotenv from 'dotenv'
import { MongoClient, Db } from 'mongodb'
import app from './app'
import StoriesDAO from './dao/storiesDAO'

dotenv.config()
const port = process.env.PORT || 3001

;(async () => {
    try {
        const client: MongoClient = await MongoClient.connect(process.env.DB_URI)
        const db: Db = client.db('exteractive')

        StoriesDAO.inject(db)

        app.listen(port, () => console.log(`Listening on port ${port}...`))
    } catch (e) {
        console.error(e)
    }
})()
