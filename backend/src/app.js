const express = require('express')
const app = express()


app.get('/health' , (req,res)=>{
res.send('good')
})






module.exports = app


