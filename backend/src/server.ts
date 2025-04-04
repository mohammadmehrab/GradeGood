import express, { Request, RequestHandler, Response } from 'express'
import { prisma } from './prisma'
import dotenv from 'dotenv'

dotenv.config({path: '../.env'})


const app = express()
const port = 3000

app.use(express.json())

type User = {
    name: string;
    email: string;
}

app.get('/', (req: Request, res: Response) => {
    res.send("hi there")
})

app.get('/users', async (req: Request, res: Response) => {
    const result = await prisma.user.findMany()

    res.send(result)
})

app.get('/users/:id', async (req: Request, res: Response) => {
    const result = await prisma.user.findMany({
        where: {
            id: parseInt(req.params.id)
        }
    })

    res.send(result)
})

app.post('/users', (async (req: Request, res: Response) => {

    const body: User = req.body

    if(!body || typeof body.name !== 'string' || typeof body.email !== 'string') {
        return res.status(400).send({error: "Name and email are required."})
    }

    try {
        const result = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email
            }
        })
    
        res.send(result)
    } catch (err: any) {
        console.error('Error creating user:', err)
        if(err.meta.target[0] === 'email') {
            res.status(400).send({error: 'Email already in use'})
        } else {
            res.status(500).send({error: 'Internal server error', blah: err})
        }
        
    }

    
}) as RequestHandler)



app.listen(port)