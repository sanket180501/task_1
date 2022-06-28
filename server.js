const express = require("express")
const mongoose= require("mongoose")
const dotenv = require("dotenv")


dotenv.config()
const adminrouter = require("./routes/admin")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/admin',adminrouter)

mongoose.connect(process.env.DBURL,{useNewUrlParser: true})
.then(()=>{
    console.log("DB connected...")
    app.listen(8000,()=>{
        console.log("Server Started...")
    })
})