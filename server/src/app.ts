import express, { Express } from 'express'
import { MongoClient, Collection } from 'mongodb'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()
const client: MongoClient = new MongoClient(process.env.DB_URI)

const app: Express = express()
const port = process.env.PORT || 3001

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('/api/hello', async (_, res) => {
    try {
        await client.connect()
        const stories: Collection = client.db('exteractive').collection('stories')

        const result = await stories.findOne({})
        res.send(result.text)
    } finally {
        await client.close()
    }
})

app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, 'index.html')))

app.listen(port, () => console.log(`Listening on port ${port}...`))
