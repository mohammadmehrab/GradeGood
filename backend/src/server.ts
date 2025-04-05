import express, { Request, RequestHandler, Response } from 'express'
import { prisma } from './prisma'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config({path: '../.env'})


const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

type User = {
    name: string;
    email: string;
}

type Course = {
    name: string,
    creditHours: number,
    grade: number,
    userId: number
}

app.get('/', (req: Request, res: Response) => {
    res.send("hi there")
})

app.get('/users', async (req: Request, res: Response) => {

    if(req.query.email) {
        const result = await prisma.user.findFirst({
            where: {
                email: req.query.email as string
            }
        })
        res.send(result)
    } else {
        const result = await prisma.user.findMany()
        res.send(result)
        
    }

    
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

app.get('/users/:id/courses', async (req: Request, res: Response) => {//return all courses given user id
    const result = await prisma.user.findMany({
        where:{
            id: parseInt(req.params.id)
        }
        })

    res.send(result)
})

app.post('/courses', (async (req: Request, res: Response) => {

    const body: Course = req.body

    console.log(body)

    if(!body || typeof body.name !== 'string' || isNaN(body.creditHours) || isNaN(body.grade) || isNaN(body.userId)) {
        return res.status(400).send({error: "Course name, Credit hours, Grade, and User ID are required."})
    }

    try {
        const result = await prisma.course.create({
            data: {
                name: body.name,
                creditHours: body.creditHours,
                grade: body.grade,
                userId: body.userId,
            }
        })
    
        res.send(result)
    } catch (err: any) {
        console.error('Error creating course:', err)
        
    }

    
}) as RequestHandler)

app.listen(port)