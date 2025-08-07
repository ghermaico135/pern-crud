import express from 'express'
import cors from "cors"
import bodyparse from 'body-parser'
import dotenv from "dotenv"
import employeeRoute from "./routes/employee.js"


const app = express()

const PORT = process.env.PORT || 5000;

const corsOption = {
    origin:'*'
}

app.use(cors(corsOption))
app.use(bodyparse.json())

app.use('/api/employee', employeeRoute)

app.use((req,res)=>{
    res.status(404).json({error: "Not Found!"})
})

app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({error:message});
})

app.listen(PORT ,()=>{
    console.log(`Server listens at port ${PORT}`)
})