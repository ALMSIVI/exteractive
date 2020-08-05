import express, { Express } from 'express'
import * as path from 'path'

const app: Express = express()
const port = process.env.PORT || 3001

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('/api/hello', (_, res) => res.send('Hello world!'))
app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, 'index.html')))

app.listen(port, () => console.log(`Listening on port ${port}...`))
