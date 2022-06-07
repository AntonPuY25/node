import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import {videoRoute} from "./Routes/videos/videos-router";
const app = express()

const port = process.env.PORT || 3000
app.use(cors())
app.use(bodyParser())

const testMiddleWare = (req:Request, res:Response, next:NextFunction) => {
    console.log('Hello')
    next()
};

app.use(testMiddleWare)


const parserMiddleWare = bodyParser({})
app.use(parserMiddleWare)


app.use('/videos',videoRoute )


app.get('/', (req:Request, res:Response) => {
    res.send('Hello World1')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})