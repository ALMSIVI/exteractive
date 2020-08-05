import express, { Express } from 'express'

const app: Express = express()
const port = process.env.PORT || 3001

app.get('/api/hello', (req, res) => res.send('Hello world!'))
app.listen(port, () => console.log(`Listening on port ${port}...`))
