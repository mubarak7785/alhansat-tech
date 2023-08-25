const express = require ("express")
const cors = require("cors")

const app = express()
app.use(cors())
const port=process.env.PORT || 2954
app.use(express.json())

const connect=require("./config/db")

const dataController=require("./controllers/data.controller")
app.use("/data",dataController)



app.listen(port,async function (req,res){
    try{
        await connect();
        console.log ("Listening Port 2554")
    }catch(err){
        console.log(err.message)
    }
})