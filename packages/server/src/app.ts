import express, { Express } from 'express'
import bodyParser from 'body-parser'
import * as path from 'path'
import stories from './api/stories.route'
const app: Express = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.resolve(__dirname, 'client')))
app.use('/api/stories', stories)

app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, 'index.html')))

export default app
