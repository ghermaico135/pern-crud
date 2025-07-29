import express from 'express'
import cors from "cors"
import bodyparse from 'body-parser'
import dotenv from "dotenv"
import employeeRoute from "./routes/employee.js"

const app = express()

const PORT = 5000;

const corsOption = {
    origin:'*'
}

app.use(cors(corsOption))
app.use(bodyparse.json())

app.use('/api/employee', employeeRoute)



app.listen(PORT ,()=>{
    console.log(`Server listens at port ${PORT}`)
})