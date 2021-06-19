const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')

const port = 5000;

app.post('/login', (req,res) => {
    const user = {
        id : 3,
        name : "NahaYadav",
        email : "Nehayadava@123gmail.com"
    }
    const Token = jwt.sign(user,'my_secret_key')
        res.json({Token:Token})  
})

app.get('/api/test',verifyToken,(req,res) => {
    jwt.verify(req.Token,'my_secret_key',(err,token) => {
        if(err){
            console.log(403)
        }else{
            return res.json({message : "token message..",token:token})
        }
    })
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers.authorization;
    console.log(bearerHeader)
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.substring(7, bearerHeader.length)
        req.Token = bearer
        next()
    }else{
        res.sendStatus(403)
    }
}



app.listen(port,(req,res) => {
    console.log(`server is running on ${port}`)
})