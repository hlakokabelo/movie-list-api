import express from 'express'


const app = express()


const PORT = 5001

app.get('/hello',(req,res)=>{
    res.json({message:"hello world"})
})

const server = app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

